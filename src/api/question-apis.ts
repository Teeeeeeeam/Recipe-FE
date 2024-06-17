import requester from '.'

interface QuestionOption {
  questionType: string
  title: string
  questionContent: string
  answer: string
  answerEmail: string
}
export async function sendQuestion(
  apiPath: string,
  req: QuestionOption,
  img: File | null,
) {
  const formData = new FormData()
  if (img === null) {
    formData.append('questionRequest', JSON.stringify(req))
  } else {
    formData.append('questionRequest', JSON.stringify(req))
    formData.append('file', img)
  }
  const { payload } = await requester({
    method: 'POST',
    url: apiPath,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return payload
}
