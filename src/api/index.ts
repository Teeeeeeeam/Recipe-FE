import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '@/lib/local-storage'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { postRefreshToken } from './auth-apis'
import store from '@/store'
import { resetState } from '@/store/user-info-slice'

const { dispatch } = store

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

const requester = async <Payload>(option: AxiosRequestConfig) => {
  const accessToken = getLocalStorage('accessToken')
  const response: AxiosResponse<Payload> = await axiosInstance(
    accessToken
      ? { headers: { Authorization: `Bearer ${accessToken}` }, ...option }
      : { ...option },
  )

  return {
    status: response.status,
    headers: response.headers,
    payload: response.data,
  }
}

axiosInstance.interceptors.request.use(
  function (config) {
    // const accessToken = getLocalStorage('accessToken')
    // if (accessToken) {
    //   config.headers['Authorization'] = `Bearer ${accessToken}`
    // }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

export const getAccessToken = async () => {
  try {
    const accessToken = await postRefreshToken()
    setLocalStorage('accessToken', accessToken)
    return accessToken
  } catch (error) {
    removeLocalStorage('accessToken')
    // 다른 요청 있을 때 수정 해야됨
    window.location.href = '/user/login'
  }
}

// 여러 요청 동시에 진행될 때 memoization 필요?
const createAxiosResponseInterceptor = () => {
  const interceptor = axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const {
        config,
        response: { status },
      } = error

      if (status !== 401 && status !== 405) {
        return Promise.reject(error)
      }

      axiosInstance.interceptors.response.eject(interceptor)
      try {
        const newAccessToken = await postRefreshToken()
        if (newAccessToken) {
          setLocalStorage('accessToken', newAccessToken)
          config.headers['Authorization'] = `Bearer ${newAccessToken}`
        }
        return axiosInstance(config)
      } catch (err) {
        removeLocalStorage('accessToken')
        dispatch(resetState())
        window.location.href = '/user/login'
        return Promise.reject(err)
      }
    },
  )
}
createAxiosResponseInterceptor()

export default requester
// if ((status === 401 || status === 405) && !config._retry) {
//   config._retry = true
//   axios.interceptors.response.eject(interceptor)
//   try {
// if (accessToken) {
// const newAccessToken = await postRefreshToken()
// if (newAccessToken) {
//   setLocalStorage('accessToken', newAccessToken)
//   error.config.headers['Authorization'] = `Bearer ${newAccessToken}`
//   createAxiosResponseInterceptor()
//   return axiosInstance(config)
//     }
// }
//   } catch (refreshError) {
//     removeLocalStorage('accessToken')
//     window.location.href = '/user/login'
//     return Promise.reject(refreshError)
//   }
// }

// return Promise.reject(error)

// return axiosInstance(error.config)
// return axiosInstance
// .post('/api/auth/refresh-token/validate')
// .then((res) => {
//   console.log(res)
//   setLocalStorage('accessToken', res.data)
//   error.res.config.headers['Authorization'] = `Bearer ${res.data}`
//   return axios(error.res.config)
// })
// .catch((err) => {
// removeLocalStorage('accessToken')
// window.location.href = '/user/login'
// return Promise.reject(err)
// })
// .finally(createAxiosResponseInterceptor)
