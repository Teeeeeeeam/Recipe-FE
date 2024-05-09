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
