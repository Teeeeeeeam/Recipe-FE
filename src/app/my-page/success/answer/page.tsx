'use client'

import { deleteQuestion, inquiryQuestion } from '@/api/login-user-apis'
import InputDeleteButton from '@/components/user/infinite-paging/input/input-delete-button'
import InputTableBody from '@/components/user/infinite-paging/input/input-table-body'
import InputTableBodyNoData from '@/components/user/infinite-paging/input/input-table-body-no-data'
import InputTableHeader from '@/components/user/infinite-paging/input/input-table-header'
import { MyQuestion } from '@/types/user'
import axios from 'axios'
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
        <div className="rounded-lg pb-4">
          <table className="w-full border-gray-200 table-fixed">
            <InputTableHeader
              theadOptions={[
                { class: 'p-2', title: '제목' },
                { class: 'p-2 sm:w-[10%] w-[20%]', title: '상태' },
                { class: 'p-2 sm:w-[10%] w-[20%]', title: '삭제' },
              ]}
              isChecked={isAllChecked}
              onChange={allCheckHandler}
            />
            {question.length > 0 ? (
              <InputTableBody
                data={question}
                isStatus={true}
                onChange={eachCheckHandler}
                onClick={deleteQuestionHandler}
              />
            ) : (
              <InputTableBodyNoData isStatus={true} />
            )}

            <tfoot ref={loader}></tfoot>
          </table>
        </div>
      </div>
      <div className="text-end">
        <InputDeleteButton onClick={deleteQuestionHandler} />
      </div>
    </>
  )
}
