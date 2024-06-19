import { Response, SendQuestionReq } from '@/types/question-api-type'
import requester from '.'

export async function sendQuestion(
  url: string,
  req: SendQuestionReq,
  img: File | null,
) {
  const formData = new FormData()
  if (img === null) {
    formData.append('questionRequest', JSON.stringify(req))
  } else {
    formData.append('questionRequest', JSON.stringify(req))
    formData.append('file', img)
  }
  const { payload } = await requester<Response>({
    method: 'POST',
    url,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return payload
}
