'use client'

import { inquiryQuestionDetail } from '@/api/login-user-apis'
import { QuestionDetailComplete } from '@/types/user'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import AnswerDetailContent from './answer-detail-content'
import AnswerDetailHeadSubject from './answer-detail-head-subject'

export default function AnswerDetail() {
  const [answers, setAnswers] = useState<QuestionDetailComplete | null>(null)
  const [status, setStatus] = useState<string>('')
  const params = useParams()
  const thisId = Number(params.id)

  useEffect(() => {
    getAnswerDetail()
  }, [])
  async function getAnswerDetail() {
    try {
      const result = await inquiryQuestionDetail(thisId)
      setStatus(result.data.status)
      setAnswers(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  if (!answers) return <div>로딩중</div>
  return (
    <>
      <div className="mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <AnswerDetailHeadSubject title="문의사항" date={answers.createdAt} />
          <AnswerDetailContent
            ctg="string"
            title="문의 제목"
            content={answers.title}
            className="border-b"
          />
          <AnswerDetailContent
            ctg="string"
            title="문의 내용"
            content={answers.questionContent}
            className="border-b"
          />
          <AnswerDetailContent
            ctg="image"
            title="첨부한 이미지"
            src={answers.imgUrl}
            className="border-b"
          />
        </div>

        {status === 'COMPLETED' && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-5">
            <AnswerDetailHeadSubject title="답변" date={answers.answeredAt} />
            <AnswerDetailContent
              ctg="string"
              title="답변 제목"
              content={answers.answer.answerTitle}
              className="border-b"
            />
            <AnswerDetailContent
              ctg="string"
              title="답변 제목"
              content={answers.answer.answerContent}
              className="border-b"
            />
          </div>
        )}
      </div>
    </>
  )
}
