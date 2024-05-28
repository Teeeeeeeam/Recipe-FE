import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '@/lib/local-storage'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { postRefreshToken } from './auth-apis'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})
const accessToken = getLocalStorage('accessToken')
const requester = async <Payload>(option: AxiosRequestConfig) => {
  const response: AxiosResponse<Payload> = await axiosInstance({
    ...option,
    headers: {
      ...option.headers,
    },
  })

  return {
    status: response.status,
    headers: response.headers,
    payload: response.data,
  }
}

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers['Content-Type'] = 'application/json'
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

// export const getAccessToken = async () => {
//   try {
//     const accessToken = await postRefreshToken()
//     setLocalStorage('accessToken', accessToken)
//     return accessToken
//   } catch (error) {
//     removeLocalStorage('accessToken')
//     // 다른 요청 있을 때 수정 해야됨
//     window.location.href = '/user/login'
//   }
// }

// 여러 요청 동시에 진행될 때 memoization 필요?
const createAxiosResponseInterceptor = () => {
  const interceptor = axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // const { config, response } = error

      // if (!response) {
      //   return Promise.reject(error)
      // }
      if (error.response.status !== 401) {
        return Promise.reject(error)
      }
      // const { status } = response
      axios.interceptors.response.eject(interceptor)
      return axiosInstance
        .post('/api/auth/refresh-token/validate')
        .then((res) => {
          setLocalStorage('accessToken', res.data)
          error.res.config.headers['Authorization'] = `Bearer ${res.data}`
          return axios(error.res.config)
        })
        .catch((err) => {
          removeLocalStorage('accessToken')
          window.location.href = '/user/login'
          return Promise.reject(err)
        })
        .finally(createAxiosResponseInterceptor)
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
//     const newAccessToken = await postRefreshToken()
//     if (newAccessToken) {
//       setLocalStorage('accessToken', newAccessToken)
//       error.config.headers['Authorization'] = `Bearer ${newAccessToken}`
//       createAxiosResponseInterceptor()
//       return axiosInstance(config)
//     }
// }
//   } catch (refreshError) {
//     removeLocalStorage('accessToken')
//     window.location.href = '/user/login'
//     return Promise.reject(refreshError)
//   }
// }

// return Promise.reject(error)
