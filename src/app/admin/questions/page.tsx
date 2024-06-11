'use client'

import { deleteNotice, getQuestions } from '@/api/admin-apis'
import { RadioButtonGroup } from '@/components/common/radio-button'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { QuestionInfo } from '@/types/admin'
import Link from 'next/link'
import { useState, useCallback, useEffect } from 'react'

const Question = () => {
  const [selectedGroup1, setSelectedGroup1] = useState<string | null>(null)
  const [selectedGroup2, setSelectedGroup2] = useState<string | null>(null)
  const [questions, setQuestions] = useState<QuestionInfo[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [lastId, setLastId] = useState<number | null>(null)

  const fetchGetQuestions = useCallback(async () => {
    if (!hasMore) return
    const questionsType =
      selectedGroup1 === '일반'
        ? 'GENERAL_INQUIRY'
        : selectedGroup1 === '계정'
          ? 'ACCOUNT_INQUIRY'
          : null
    const questionStatus =
      selectedGroup2 === '미완료'
        ? 'PENDING'
        : selectedGroup2 === '완료'
          ? 'COMPLETED'
          : null
    try {
      const res = await getQuestions(lastId, questionsType, questionStatus)
      const newQuestions = res.questions
      setQuestions((prev) =>
        lastId ? [...prev, ...newQuestions] : newQuestions,
      )
      setHasMore(res.nextPage)
      setLastId(newQuestions[newQuestions.length - 1].id)
    } catch (err) {
      console.log(err)
    }
  }, [hasMore, lastId, selectedGroup1, selectedGroup2])

  const lastElementRef = useInfiniteScroll(fetchGetQuestions, hasMore)

  useEffect(() => {
    setQuestions([])
    setLastId(null)
    setHasMore(true)
    fetchGetQuestions()
  }, [selectedGroup1, selectedGroup2])

  return (
    <div>
      <div className="flex gap-x-4">
        <div className="border p-2">
          <RadioButtonGroup
            options={['일반', '계정']}
            selectedOption={selectedGroup1}
            onOptionChange={setSelectedGroup1}
          />
        </div>
        <div className="border p-2">
          <RadioButtonGroup
            options={['미완료', '완료']}
            selectedOption={selectedGroup2}
            onOptionChange={setSelectedGroup2}
          />
        </div>
      </div>
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
                <li>{el.create_at.slice(0, 10)}</li>
                <li>
                  {el.questionType === 'ACCOUNT_INQUIRY' ? '계정' : '일반'}
                </li>
                <li>{el.status === 'PENDING' ? '미완료' : '완료'}</li>
              </ul>
            ))}
          <div ref={lastElementRef}></div>
        </div>
      </div>
    </div>
  )
}

export default Question
