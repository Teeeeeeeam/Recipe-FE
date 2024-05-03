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
//option : header,method(get,post,update 등등), url(api_url 뒤에 들어가는 url) 같은 것들을 넣는 매개변수
//return(response)
// -> status (결과 상태값 200,401,404 등등)
// -> headers (결과 헤더)
// -> payload (response body)

const requester = async <Payload>(option: AxiosRequestConfig) => {
  const accessToken = getLocalStorage('accessToken')
  const refreshToken = getLocalStorage('refreshToken')
  const response: AxiosResponse<Payload> = await axiosInstance(
    accessToken
      ? {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            RefreshToken: `Bearer ${refreshToken}`,
          },
          ...option,
        }
      : {
          ...option,
        },
  )
  return {
    status: response.status, //
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

axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    if (error.response.status === 401) {
      const refreshToken = getLocalStorage('refreshToken')
      if (refreshToken) {
        try {
          const newAccessToken = await postRefreshToken(refreshToken)
          removeLoaclStorage('accessToken')
          setLocalStorage('accessToken', newAccessToken)
        } catch (error) {
          removeLoaclStorage('accessToken')
          removeLoaclStorage('refreshToken')
          alert('로그인이 필요합니다.')
        }
      }
    }
  },
)
export default requester
