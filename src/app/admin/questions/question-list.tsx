import { QuestionInfo } from '@/types/admin'
import Link from 'next/link'

interface QuestionListProps {
  questions: QuestionInfo[]
  lastElementRef: React.RefObject<HTMLDivElement>
}

const QuestionList = ({ questions, lastElementRef }: QuestionListProps) => {
  return (
    <div className="bg-navy-50 p-2 text-white rounded-md mt-2">
      <ul className="grid grid-cols-[1fr_1fr_3fr_2fr_2fr_1fr_1fr] text-[12px] lg:text-[16px] text-center bg-navy-100 py-4 rounded-t-md ">
        <li>체크</li>
        <li>번호</li>
        <li>제목</li>
        <li>글쓴이</li>
        <li>등록일자</li>
        <li>종류</li>
        <li>상태</li>
      </ul>
      <div className="flex flex-col space-y-2 mt-2">
        {questions &&
          questions.map((el) => (
            <ul
              key={el.id}
              className="grid grid-cols-[1fr_1fr_3fr_2fr_2fr_1fr_1fr] text-[12px] lg:text-[16px] text-center bg-navy-100 py-4"
            >
              <li>체크</li>
              <li>{el.id}</li>
              <Link href={`/admin/questions/${el.id}`}>
                <li>{el.title}</li>
              </Link>
              <li>{el.member.loginId}</li>
              <li>{el.createdAt}</li>
              <li>{el.questionType === 'ACCOUNT_INQUIRY' ? '계정' : '일반'}</li>
              <li>{el.status === 'PENDING' ? '미완료' : '완료'}</li>
            </ul>
          ))}
        <div ref={lastElementRef}></div>
      </div>
    </div>
  )
}

export default QuestionList
