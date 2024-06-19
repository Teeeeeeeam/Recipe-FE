'use client'

import { inquiryQuestionDetail } from '@/api/login-user-apis'
import { QuestionDetail } from '@/types/user'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AnswerDetail() {
  const [answer, setAnswer] = useState<QuestionDetail>()
  const params = useParams()
  const thisId = Number(params.id)

  useEffect(() => {
    getAnswerDetail()
  }, [])
  async function getAnswerDetail() {
    try {
      const result = await inquiryQuestionDetail(thisId)
      setAnswer(result.data)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(answer)

  return (
    <div>
      <div>
        <h4>문의 상세페이지</h4>
        <br />
        <h5>내가 한 문의사항</h5>
        <p>답변 현황: {answer?.status}</p>
        <p>문의 날짜: {answer?.createdAt}</p>
        <p>제목: {answer?.title}</p>
        <p>문의 내용: {answer?.questionContent}</p>
        <p>
          내가 보낸 첨부이미지:
          <Image
            src={answer?.imgUrl || ''}
            alt="첨부이미지"
            width={150}
            height={150}
          />
        </p>
        <br />
        <h5>관리자 답변</h5>
        <p>운영자 이름: {answer?.answer.answerAdminNickname}</p>
        <p>답변 날짜: {answer?.answeredAt}</p>
        <p>제목: {answer?.answer.answerTitle}</p>
        <p>답변 내용: {answer?.answer.answerContent}</p>
      </div>
    </div>
  )
}
