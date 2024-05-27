import axios, { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios'
import requester from '.'

export async function checkUser(apiPath: string, token: string | undefined) {
  const result = await axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}${apiPath}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => res.data)
    .catch((error) => console.log(error))
  return result
}

interface SuccessFetch {
  status: number
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders
  payload: {
    data: string
    message: string
    success: boolean
  }
}
export async function checkExpireToken() {
  const options = {
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token/validate`,
  }
  const result: SuccessFetch = await requester(options)
  return result
}
