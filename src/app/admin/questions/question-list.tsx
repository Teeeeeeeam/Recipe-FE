import { QuestionInfo } from '@/types/admin'
import Link from 'next/link'
import { useState } from 'react'

interface QuestionListProps {
  questions: QuestionInfo[]
  lastElementRef: React.RefObject<HTMLDivElement>
}

const QuestionList = ({ questions, lastElementRef }: QuestionListProps) => {
  const [hoveredQuestion, setHoveredQuestion] = useState<QuestionInfo | null>(
    null,
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleMouseEnter = (question: QuestionInfo) => {
    setHoveredQuestion(question)
    setIsModalOpen(true)
  }

  const handleMouseLeave = () => {
    setHoveredQuestion(null)
    setIsModalOpen(false)
  }

  return (
    <div className="bg-white md:p-4 rounded shadow text-[12px] md:text-[14px] mt-4">
      <ul className="grid grid-cols-[3fr_2fr_1fr_1fr] md:grid-cols-[1fr_3fr_2fr_2fr_1fr_1fr] text-center font-semibold bg-gray-200 p-2 rounded-t">
        <li className="hidden md:block">번호</li>
        <li>제목</li>
        <li>글쓴이</li>
        <li className="hidden md:block">등록일자</li>
        <li>종류</li>
        <li>상태</li>
      </ul>
      <div className="flex flex-col space-y-2 mt-2">
        {questions &&
          questions.map((question) => (
            <Link href={`/admin/questions/${question.id}`} key={question.id}>
              <ul
                className="relative grid grid-cols-[3fr_2fr_1fr_1fr] md:grid-cols-[1fr_3fr_2fr_2fr_1fr_1fr] text-center p-2 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                onMouseEnter={(e) => handleMouseEnter(question)}
                onMouseLeave={handleMouseLeave}
              >
                <li className="hidden md:block">{question.id}</li>
                <li>{`${question.title.length > 12 ? question.title.slice(0, 12) + '...' : question.title}`}</li>
                <li>{question.member.loginId}</li>
                <li className="hidden md:block">{question.createdAt}</li>
                <li
                  className={`${question.questionType === 'ACCOUNT_INQUIRY' && 'text-green-150'}`}
                >
                  {question.questionType === 'ACCOUNT_INQUIRY'
                    ? '계정'
                    : '일반'}
                </li>
                <li
                  className={`${question.status === 'PENDING' ? 'text-red-50' : 'text-blue-100'}`}
                >
                  {question.status === 'PENDING' ? '미완료' : '완료'}
                </li>

                {hoveredQuestion &&
                  hoveredQuestion.id === question.id &&
                  isModalOpen && (
                    <div className="absolute break-words top-[110%] left-[25%] max-w-[200px] md:max-w-[300px]   bg-white border rounded shadow-lg p-4 z-10">
                      <ul className="w-full list-none p-0 m-0 text-left ">
                        <li>
                          <span className="font-bold">{`번호 : `}</span>
                          <span>{hoveredQuestion.id}</span>
                        </li>
                        <li>
                          <span className="font-bold">{`제목 : `}</span>
                          <span>{hoveredQuestion.title}</span>
                        </li>
                        <li>
                          <span className="font-bold">{`글쓴이 : `}</span>
                          <span>{hoveredQuestion.member.loginId}</span>
                        </li>
                        <li>
                          <span className="font-bold">{`등록일자 : `}</span>
                          <span>{hoveredQuestion.createdAt}</span>
                        </li>
                        <li>
                          <span className="font-bold">{`종류 : `}</span>
                          <span
                            className={`${hoveredQuestion.questionType === 'ACCOUNT_INQUIRY' && 'text-green-150'}`}
                          >
                            {hoveredQuestion.questionType === 'ACCOUNT_INQUIRY'
                              ? '계정'
                              : '일반'}
                          </span>
                        </li>
                        <li>
                          <span className="font-bold">{`상태 : `}</span>
                          <span
                            className={`${hoveredQuestion.status === 'PENDING' ? 'text-red-50' : 'text-blue-100'}`}
                          >
                            {hoveredQuestion.status === 'PENDING'
                              ? '미완료'
                              : '완료'}
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
              </ul>
            </Link>
          ))}
        <div ref={lastElementRef}></div>
      </div>
    </div>
  )
}

export default QuestionList
