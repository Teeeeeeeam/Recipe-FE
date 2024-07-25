'use client'
import { getQuestionsDetail } from '@/api/admin-apis'
import { QuestionDetail } from '@/types/admin'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import AnswerModal from './answer-modal'
import Image from 'next/image'
import QuestionDetailItem from './question-detail-item'
import Link from 'next/link'

const QuestionsDetail = () => {
  const [questionInfo, setQuestionInfo] = useState<QuestionDetail | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const params = useParams()
  const id = params.id
  const router = useRouter()

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

  if (!questionInfo) {
    return <div>Loading...</div>
  }
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="relative flex flex-col space-y-4 border border-gray-300 rounded-lg shadow-md p-6 bg-white">
        <button
          type="button"
          className="absolute top-8 right-4 px-4 py-2 bg-green-150 text-white rounded hover:bg-green-100"
          disabled={questionInfo.status === 'COMPLETED'}
          onClick={handleAnswerClick}
        >
          답변하기
        </button>
        <h2 className="text-xl font-bold">문의 상세</h2>
        <QuestionDetailItem
          label="답변 방식"
          value={questionInfo.answerType === 'EMAIL' ? '이메일' : '없음'}
        />
        {questionInfo.answerEmail && (
          <QuestionDetailItem label="이메일" value={questionInfo.answerEmail} />
        )}
        <QuestionDetailItem
          label="문의 날짜"
          value={questionInfo.createdAt.slice(0, 10)}
        />
        <QuestionDetailItem
          label="문의 유형"
          value={
            questionInfo.questionType === 'ACCOUNT_INQUIRY'
              ? '계정 문의'
              : '일반 문의'
          }
        />
        <QuestionDetailItem
          label="답변 상태"
          value={questionInfo.status === 'PENDING' ? '미완료' : '완료'}
          isCompleted={questionInfo.status === 'COMPLETED'}
        />
        {questionInfo.member?.loginId && (
          <QuestionDetailItem
            label="아이디"
            value={questionInfo.member.loginId}
          />
        )}
        <QuestionDetailItem
          label="제목"
          value={questionInfo.title}
          isFullWidth
        />
        <QuestionDetailItem
          label="내용"
          value={questionInfo.questionContent}
          isFullWidth
        />
        {questionInfo.imgUrl && (
          <Link href={questionInfo.imgUrl} target="_blank">
            <Image
              src={questionInfo.imgUrl}
              alt="img"
              width={140}
              height={140}
            />
          </Link>
        )}
      </div>
      {isModalOpen && (
        <AnswerModal id={id} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}

export default QuestionsDetail
