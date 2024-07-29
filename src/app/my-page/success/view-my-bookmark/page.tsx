'use client'
import { doBookmark, inquiryBookmark } from '@/api/login-user-apis'
import { MyBookmark } from '@/types/user'
import { useEffect, useState } from 'react'
import TableHeader from '@/components/user/infinite-paging/sequence/table-header'
import TableBody from '@/components/user/infinite-paging/sequence/table-body'
import TableBodyNoData from '@/components/user/infinite-paging/sequence/table-body-no-data'
import {
  InfiniteScrollSkeleton,
  MypageSkeletonLoader,
} from '@/components/layout/skeleton/mypage-skeleton'
import axios, { AxiosError } from 'axios'
import useInfiniteScrollVer2 from '@/hooks/use-infinite-scroll-ver2'

export default function ViewBookmark() {
  const [firstRender, setFirstRender] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false)
  const [bookmarkData, setBookmarkData] = useState<MyBookmark[] | []>([])
  const [next, setNext] = useState<boolean>(false)
  const [lastId, setLastId] = useState<number | null>(null)
  const [mount, setMount] = useState<boolean>(false)

  const loader = useInfiniteScrollVer2(next, setIsMoreLoading, bookmarkData)

  useEffect(() => {
    getInquiryBookmarkPosting(true)
    setFirstRender(true)
    setIsLoading(false)
  }, [mount])

  useEffect(() => {
    if (firstRender && isMoreLoading) {
      getInquiryBookmarkPosting(false)
      setIsMoreLoading(false)
    }
  }, [isMoreLoading])

  async function getInquiryBookmarkPosting(isInit: boolean) {
    setIsLoading(true)
    try {
      const option = {
        size: 13,
      }
      const result = await inquiryBookmark(option, lastId)
      if (isInit) {
        setBookmarkData(result.data.bookmarkList)
      } else {
        setBookmarkData((prev) => {
          const newData = result.data.bookmarkList
          return [...prev, ...newData]
        })
      }
      if (result.data.bookmarkList.length > 0) {
        const dataLastId =
          result.data.bookmarkList[result.data.bookmarkList.length - 1]?.id
        setLastId(dataLastId)
      }
      setNext(result.data.nextPage)
      setIsLoading(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const res = axiosError.response.data as { message: string }
          alert(res.message)
        }
      }
    }
  }

  async function cancelBookmark(thisId: number) {
    try {
      const option = {
        recipeId: thisId,
      }
      await doBookmark(option)
      setLastId(null)
      setMount((prev) => !prev)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const res = axiosError.response.data as { message: string }
          alert(res.message)
        }
      }
    }
  }

  return (
    <div className="w-10/12 mx-auto p-4">
      <div className="flex items-center border-b pb-4 mb-4">
        <h3 className="text-2xl font-semibold">즐겨찾기</h3>
      </div>
      {isLoading ? (
        <MypageSkeletonLoader rows={13} columns={3} />
      ) : (
        <div className="h-[70vh] bg-white overflow-y-scroll">
          <div className="rounded-lg pb-4">
            <table className="w-full border-gray-200 table-fixed">
              <TableHeader
                theadOptions={[
                  { class: 'p-2 w-[10%]', title: '#' },
                  { class: 'p-2 w-[80%]', title: '제목' },
                  { class: 'p-2 sm:w-[10%] w-[20%]', title: '취소' },
                ]}
              />
              {isMoreLoading ? (
                <InfiniteScrollSkeleton rows={13} columns={3} />
              ) : (
                <>
                  {bookmarkData.length > 0 ? (
                    <TableBody
                      ctg={1}
                      info="즐겨찾기"
                      data={bookmarkData}
                      onClick={cancelBookmark}
                    />
                  ) : (
                    <TableBodyNoData />
                  )}
                </>
              )}
              <tfoot ref={loader}></tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
