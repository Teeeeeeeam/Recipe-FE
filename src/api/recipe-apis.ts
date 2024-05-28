import { UpdateData } from '@/app/list-page/user-recipes/modification/page'
import { Options } from '@/types/recipe'
import axios from 'axios'
import requester from '.'

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

export async function postUserMod(
  apiPath: string,
  data: UpdateData,
  img: File | null,
  token: string,
) {
  const formData = new FormData()
  if (img === null) {
    formData.append('updatePostDto', JSON.stringify(data))
  } else {
    formData.append('updatePostDto', JSON.stringify(data))
    formData.append('file', img)
  }
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

export async function postUserDel(apiPath: string, params: number) {
  const { payload } = await requester({
    method: 'Delete',
    url: `${apiPath}/${params}`,
  })
  return payload
}

export async function verifyPw(apiPath: string, params: any) {
  const { payload } = await requester({
    method: 'POST',
    url: apiPath,
    data: params,
  })
  return payload
}
