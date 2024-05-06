import axios from 'axios'

export function mainRecipeHandler(apiPath: string) {
  const result = axios
    .get(apiPath)
    .then((res) => res.data)
    .catch((error) => console.log(error))
  return result
}
