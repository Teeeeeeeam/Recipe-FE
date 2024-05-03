import { getLocalStorage } from '@/lib/local-storage'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

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
            RefreshToken: refreshToken,
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

export default requester
