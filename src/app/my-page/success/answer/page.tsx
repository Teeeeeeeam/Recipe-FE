'use client'

import { deleteQuestion, inquiryQuestion } from '@/api/login-user-apis'
import { MyQuestion } from '@/types/user'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function Answer() {
  const [question, setQuestion] = useState<MyQuestion[]>([])
  const [next, setNext] = useState<boolean>(false)
  const [lastId, setLastId] = useState<number | null>(null)
  const [mount, setMount] = useState<boolean>(false)
  const [check, setCheck] = useState<number[]>([])

  const loader = useRef(null)

  useEffect(() => {
    getQuestion(true)
  }, [mount])

  async function getQuestion(isInit: boolean) {
    try {
      const questionType = 'GENERAL_INQUIRY'
      const option = {
        size: 10,
      }
      const result = await inquiryQuestion(option, lastId, questionType)
      if (isInit) {
        setQuestion(result.data.questions)
      } else {
        setQuestion((prev) => {
          const newData = result.data.questions
          return [...prev, ...newData]
        })
      }
      if (result.data.questions.length > 0) {
        const dataLastId =
          result.data.questions[result.data.questions.length - 1].id
        setLastId(dataLastId)
      }
      setNext(result.data.nextPage)
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteQuestionHandler(
    group: boolean,
    thisIds: number | number[],
  ) {
    try {
      const delData = group ? thisIds : check
      await deleteQuestion(delData)
      setLastId(null)
      setMount((prev) => !prev)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.status
        if (errorCode === 403) {
          alert('권한이 없습니다.')
        }
      }
    }
  }

  // Intersection Observer 콜백 함수
  const handleObserver = useCallback(
    (entries: any) => {
      const target = entries[0]
      if (target.isIntersecting) {
        if (next) {
          getQuestion(false)
        }
      }
    },
    [question],
  )
  // Intersection Observer 설정
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    }
    const observer = new IntersectionObserver(handleObserver, option)
    if (loader.current) {
      observer.observe(loader.current)
    }
    return () => observer.disconnect()
  }, [handleObserver])

  return (
    <div className="w-full">
      <div className="h-[80vh] overflow-y-scroll border px-5">
        {question.length > 0 ? (
          <ul>
            {question.map((item, index) => {
              const status = item.status
              return (
                <li key={item.id} className="border px-5 mb-3">
                  <ul className="grid grid-cols-[1fr_1fr_4fr_1fr_1fr] gap-4 py-4 text-center items-center border-b">
                    <li>
                      <input type="checkbox" />
                    </li>
                    <li>{index + 1}</li>
                    <li className="truncate">
                      <Link
                        href={
                          status === 'COMPLETED'
                            ? `/my-page/success/answer/${item.id}`
                            : ''
                        }
                      >
                        {item.title}
                      </Link>
                    </li>
                    <li className="flex items-center justify-center">
                      <Image
                        src={`/svg/${status === 'COMPLETED' ? 'completed' : 'pending'}.svg`}
                        alt={status === 'COMPLETED' ? '완료' : '대기중'}
                        width={30}
                        height={30}
                      />
                    </li>
                    <li className="flex items-center justify-center">
                      <Image
                        src="/svg/trash.svg"
                        alt="삭제"
                        width={30}
                        height={30}
                        onClick={() => deleteQuestionHandler(true, item.id)}
                        className="cursor-pointer"
                      />
                    </li>
                  </ul>
                </li>
              )
            })}
          </ul>
        ) : (
          '데이터가 없습니다.'
        )}
        <div ref={loader} />
      </div>
    </div>
  )
}
