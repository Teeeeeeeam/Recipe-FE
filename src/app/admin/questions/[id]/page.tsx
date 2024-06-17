'use client'
import { getQuestionsDetail } from '@/api/admin-apis'
import { QuestionDetail } from '@/types/admin'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import AnswerModal from './answer-modal'
import Image from 'next/image'

const QuestionsDetail = () => {
  const [questionInfo, setQuestionInfo] = useState<QuestionDetail | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const params = useParams()
  const id = params.id
  const fetchGetQuestionsDetail = async () => {
    const res = await getQuestionsDetail(Number(id))
    setQuestionInfo(res)
  }
  useEffect(() => {
    fetchGetQuestionsDetail()
  }, [])

  const handleAnswerClick = () => {
    setIsModalOpen(true)
  }
  return (
    <div className="max-w-2xl mx-auto p-4">
      {questionInfo && (
        <div className="relative flex flex-col space-y-4 border border-gray-300 rounded-lg shadow-md p-6 bg-white">
          <button
            className="absolute top-8 right-4 px-4 py-2 bg-green-150 text-white rounded hover:bg-green-100"
            onClick={handleAnswerClick}
          >
            답변하기
          </button>
          <h2 className="text-xl font-bold">문의 상세</h2>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center pb-1 border-b">
              <span className="font-bold">답변 방식</span>
              <span>
                {questionInfo.answerType === 'EMAIL' ? '이메일' : '없음'}
              </span>
            </div>
            {questionInfo.answerEmail && (
              <div className="flex justify-between items-center pb-1 border-b">
                <span className="font-bold">이메일</span>
                <span>{questionInfo.answerEmail}</span>
              </div>
            )}
            <div className="flex justify-between items-center pb-1 border-b">
              <span className="font-bold">문의 날짜</span>
              <span>{questionInfo.createdAt.slice(0, 10)}</span>
            </div>
            <div className="flex justify-between items-center pb-1 border-b">
              <span className="font-bold">문의 유형</span>
              <span>
                {questionInfo.questionType === 'ACCOUNT_INQUIRY'
                  ? '계정 문의'
                  : '일반 문의'}
              </span>
            </div>
            <div className="flex justify-between items-center pb-1 border-b">
              <span className="font-bold">답변 상태</span>
              <span>
                {questionInfo.status === 'PENDING' ? '미완료' : '완료'}
              </span>
            </div>
            {questionInfo.member?.loginId && (
              <div className="flex justify-between items-center pb-1 border-b">
                <span className="font-bold">아이디</span>
                <span>{questionInfo.member?.loginId}</span>
              </div>
            )}
            <div className="flex flex-col space-y-2 pb-1 border-b">
              <span className="font-bold">제목</span>
              <span>{questionInfo.title}</span>
            </div>
            <div className="flex flex-col space-y-2 pb-1 border-b">
              <span className="font-bold ">내용</span>
              <span>{questionInfo.questionContent}</span>
            </div>
            {questionInfo.imgUrl && (
              <Image
                src={questionInfo.imgUrl}
                alt="img"
                width={40}
                height={40}
              />
            )}
          </div>
        </div>
      )}
      {isModalOpen && (
        <AnswerModal id={id} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}

export default QuestionsDetail
