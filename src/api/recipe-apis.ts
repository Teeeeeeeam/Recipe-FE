import { Options } from '@/types/recipe'
import axios from 'axios'

export function mainRecipeHandler(apiPath: string) {
  const result = axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}${apiPath}`)
    .then((res) => res.data)
    .catch((error) => console.log(error))
  return result
}

export function detailRecipeHandler(apiPath: string) {
  const result = axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}${apiPath}`)
    .then((res) => res.data)
    .catch((error) => console.log(error))
  return result
}

export async function fetchAllAdminRecipe(apiPath: string, options: Options) {
  const result = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}${apiPath}`, { params: options })
    .then((res) => res.data)
    .catch((error) => console.log(error))
  return result
}
