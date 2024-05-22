import axios from 'axios'

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
