import requester from '.'

interface QuestionOption {
  questionType: string
  title: string
  question_content: string
  answer: string
  answer_email: string
}
export async function sendQuestion(
  apiPath: string,
  option: QuestionOption,
  img: File | null,
) {
  const formData = new FormData()
  if (img === null) {
    formData.append('questionRequest', JSON.stringify(option))
  } else {
    formData.append('questionRequest', JSON.stringify(option))
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
