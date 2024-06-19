export interface Response {
  success: boolean
  message: string
}

export interface SendQuestionReq {
  questionType: string
  title: string
  questionContent: string
  answer: string
  answerEmail: string
}
