import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '@/lib/local-storage'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { postRefreshToken } from './auth-apis'

const TEN_MINUTE = 60000
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

const requester = async <Payload>(option: AxiosRequestConfig) => {
  const response: AxiosResponse<Payload> = await axiosInstance({ ...option })

  return {
    status: response.status,
    headers: response.headers,
    payload: response.data,
  }
}

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getLocalStorage('accessToken')
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 여러 요청 동시에 진행될 때 memoization 필요?
const createAxiosResponseInterceptor = () => {
  const interceptor = axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const {
        config,
        response: { status },
      } = error

      if (status !== 401 && status !== 403) {
        return Promise.reject(error)
      }

      axiosInstance.interceptors.response.eject(interceptor)
      try {
        const newAccessToken = await postRefreshToken()
        setLocalStorage('accessToken', newAccessToken)
        setLocalStorage('expiry', Date.now() + TEN_MINUTE)
        config.headers['Authorization'] = `Bearer ${newAccessToken}`

        return axiosInstance(config)
      } catch (err) {
        removeLocalStorage('accessToken')
        window.location.href = '/user/login'
        return Promise.reject(err)
      } finally {
        createAxiosResponseInterceptor()
      }
    },
  )
}
createAxiosResponseInterceptor()

export default requester
