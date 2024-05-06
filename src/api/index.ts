import {
  getLocalStorage,
  removeLoaclStorage,
  setLocalStorage,
} from '@/lib/local-storage'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { postRefreshToken } from './auth-apis'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

const requester = async <Payload>(option: AxiosRequestConfig) => {
  const accessToken = getLocalStorage('accessToken')
  const response: AxiosResponse<Payload> = await axiosInstance(
    accessToken
      ? {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          ...option,
        }
      : {
          ...option,
        },
  )
  return {
    status: response.status as number,
    headers: response.headers,
    payload: response.data as Payload,
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
    removeLoaclStorage('accessToken')
    removeLoaclStorage('refreshToken')
    // 다른 요청 있을 때 수정 해야됨
    window.location.replace('/user/login')
  }
}

//여러 요청 동시에 진행될 때 memoization 필요?
const REFRESH_URL = '/api/auth/refresh-token/validate'
axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    const {
      config,
      response: { status },
    } = error
    if (config.url === REFRESH_URL || status !== 401 || config.sent) {
      return Promise.reject(error)
    }
    config.sent = true
    const accessToken = await getAccessToken()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
      return axios(config)
    }

    return Promise.reject(error)
  },
)
export default requester
