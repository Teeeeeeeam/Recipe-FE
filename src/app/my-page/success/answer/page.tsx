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
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false)
  const [checkedItems, setCheckedItems] = useState<number[]>([])

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

  async function deleteQuestionHandler(group: boolean, thisIds: number | null) {
    try {
      const delData = group ? thisIds : checkedItems
      await deleteQuestion(delData)
      setLastId(null)
      setIsAllChecked(false)
      setCheckedItems(checkedItems.filter((item) => item !== thisIds))
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

  function allCheckHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    const checked = e.target.checked
    const inputHandler = (isAll: boolean) => {
      const checkbox = document.querySelectorAll<HTMLInputElement>('.chk_box')
      checkbox.forEach((item) => {
        item.checked = isAll
      })
    }
    if (checked) {
      const allIds = question.map((item) => item.id)
      inputHandler(true)
      setCheckedItems(allIds)
    } else {
      inputHandler(false)
      setCheckedItems([])
    }
    setIsAllChecked(checked)
  }

  function eachCheckHandler(id: number): void {
    const newData = checkedItems.includes(id)
      ? checkedItems.filter((item) => item !== id)
      : [...checkedItems, id]
    setCheckedItems(newData)
    setIsAllChecked(newData.length === question.length)
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
    <>
      <h4 className="text-center text-lg mb-3">문의내역</h4>
      <div className="h-[60vh] sm:h-[70vh] bg-white overflow-y-scroll mb-3">
        <div className="rounded-lg p-4">
          <table className="w-full border-gray-200 table-fixed">
            <thead>
              <tr>
                <th className="p-2 w-[10%]">
                  <input
                    type="checkbox"
                    checked={isAllChecked}
                    onChange={(e) => allCheckHandler(e)}
                  />
                </th>
                <th className="p-2">제목</th>
                <th className="p-2 sm:w-[10%] w-[20%]">상태</th>
                <th className="p-2 sm:w-[10%] w-[20%]">삭제</th>
              </tr>
            </thead>
            <tbody className="">
              {question.map((item) => {
                const status = item.status
                return (
                  <tr key={item.id}>
                    <td className="px-2 py-5 text-center ">
                      <input
                        type="checkbox"
                        onChange={() => eachCheckHandler(item.id)}
                        className="chk_box"
                      />
                    </td>
                    <td className="px-2 py-5 text-center whitespace-nowrap text-ellipsis overflow-hidden">
                      <Link href={`/my-page/success/answer/${item.id}`}>
                        {item.title}
                      </Link>
                    </td>
                    <td className="px-2 py-5 flex justify-center">
                      <Image
                        src={`/svg/${status === 'COMPLETED' ? 'completed' : 'pending'}.svg`}
                        alt={status === 'COMPLETED' ? '완료' : '대기중'}
                        width={30}
                        height={30}
                      />
                    </td>
                    <td className="px-2 py-5 text-center">
                      <button type="button">
                        <Image
                          src="/svg/trash.svg"
                          alt="삭제"
                          width={25}
                          height={25}
                          onClick={() => deleteQuestionHandler(true, item.id)}
                          className="cursor-pointer"
                        />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot ref={loader}></tfoot>
          </table>
        </div>
      </div>
      <div className="text-end">
        <button
          type="button"
          onClick={() => deleteQuestionHandler(false, null)}
          className="border border-black px-3 py-2 rounded-lg"
        >
          선택삭제
        </button>
      </div>
    </>
  )
}
