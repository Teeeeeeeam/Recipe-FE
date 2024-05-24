import { Options } from '@/types/recipe'
import axios from 'axios'

// get
export function fetchGetMethod(apiPath: string) {
  const result = axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}${apiPath}`)
    .then((res) => res.data)
    .catch((error) => console.log(error))
  return result
}

// get (with params)
export async function fetchGetMethodParams(apiPath: string, options: Options) {
  const result = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}${apiPath}`, { params: options })
    .then((res) => res.data)
    .catch((error) => console.log(error))
  return result
}

// get (with params, header)
interface Config {
  headers: { [key: string]: string }
}
export async function fetchGetMethodParamsHeader(
  apiPath: string,
  config: Config,
) {
  const result = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}${apiPath}`, config)
    .then((res) => res.data)
    .catch((error) => console.log(error))
  return result
}

export async function postUserWrite(
  apiPath: string,
  data: any,
  image: any,
  token: string,
) {
  const formData = new FormData()
  formData.append('userAddPostDto', JSON.stringify(data))
  formData.append('file', image)

  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}${apiPath}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return result
  } catch (error) {
    console.log(error)
  }
}
