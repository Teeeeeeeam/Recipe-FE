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

const requester = async <Payload>(option: AxiosRequestConfig) => {
  const accessToken = getLocalStorage('accessToken')
  const response: AxiosResponse<Payload> = await axiosInstance({
    ...option,
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
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
axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    const {
      config,
      response: { status },
    } = error
    if (status === 401 && !config._retry) {
      config._retry = true
      try {
        const newAccessToken = await getAccessToken()
        if (newAccessToken) {
          config.headers.Authorization = `Bearer ${newAccessToken}`
          return axiosInstance(config)
        }
      } catch (refreshError) {
        removeLocalStorage('accessToken')
        window.location.href = '/user/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)
export default requester
