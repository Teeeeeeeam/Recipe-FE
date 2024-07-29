'use client'

import { deleteQuestion, inquiryQuestion } from '@/api/login-user-apis'
import {
  InfiniteScrollSkeleton,
  MypageSkeletonLoader,
} from '@/components/layout/skeleton/mypage-skeleton'
import InputDeleteButton from '@/components/user/infinite-paging/input/input-delete-button'
import InputTableBody from '@/components/user/infinite-paging/input/input-table-body'
import InputTableBodyNoData from '@/components/user/infinite-paging/input/input-table-body-no-data'
import InputTableHeader from '@/components/user/infinite-paging/input/input-table-header'
import useInfiniteScrollVer2 from '@/hooks/use-infinite-scroll-ver2'
import { MyQuestion } from '@/types/user'
import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'

export default function Answer() {
  const [firstRender, setFirstRender] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false)
  const [question, setQuestion] = useState<MyQuestion[]>([])
  const [next, setNext] = useState<boolean>(false)
  const [lastId, setLastId] = useState<number | null>(null)
  const [mount, setMount] = useState<boolean>(false)
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false)
  const [checkedItems, setCheckedItems] = useState<number[]>([])

  const loader = useInfiniteScrollVer2(next, setIsMoreLoading, question)

  useEffect(() => {
    getQuestion(true)
    setFirstRender(true)
    setIsLoading(false)
  }, [mount])

  useEffect(() => {
    if (firstRender && isMoreLoading) {
      getQuestion(false)
      setIsMoreLoading(false)
    }
  }, [isMoreLoading])

  async function getQuestion(isInit: boolean) {
    setIsLoading(true)
    try {
      const questionType = 'GENERAL_INQUIRY'
      const option = {
        size: 13,
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
      setIsLoading(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        if (axiosError.response) {
          alert('데이터를 불러올 수 없습니다')
        }
      }
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
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const statusCode = axiosError.response.status
          const res = axiosError.response.data as { message: string }
          if (statusCode === 403) {
            alert(res.message)
          }
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

  return (
    <div className="w-10/12 mx-auto p-4">
      <div className="flex items-center border-b pb-4 mb-4">
        <h3 className="text-2xl font-semibold">문의내역</h3>
      </div>
      {isLoading ? (
        <MypageSkeletonLoader rows={13} columns={3} />
      ) : (
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
              {isMoreLoading ? (
                <InfiniteScrollSkeleton rows={13} columns={3} />
              ) : (
                <>
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
                </>
              )}

              <tfoot ref={loader}></tfoot>
            </table>
          </div>
        </div>
      )}

      <div className="text-end">
        <InputDeleteButton onClick={deleteQuestionHandler} />
      </div>
    </div>
  )
}
