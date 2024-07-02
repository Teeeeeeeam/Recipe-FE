'use client'
import { doBookmark, inquiryBookmark } from '@/api/login-user-apis'
import { MyBookmark } from '@/types/user'
import { useCallback, useEffect, useRef, useState } from 'react'
import TableHeader from '@/components/user/infinite-paging/sequence/table-header'
import TableBody from '@/components/user/infinite-paging/sequence/table-body'
import TableBodyNoData from '@/components/user/infinite-paging/sequence/table-body-no-data'

export default function ViewBookmark() {
  const [bookmarkData, setBookmarkData] = useState<MyBookmark[] | []>([])
  const [next, setNext] = useState<boolean>(false)
  const [lastId, setLastId] = useState<number | null>(null)
  const [mount, setMount] = useState<boolean>(false)

  const loader = useRef(null)
  useEffect(() => {
    getInquiryBookmarkPosting(true)
  }, [mount])

  async function getInquiryBookmarkPosting(isInit: boolean) {
    try {
      const option = {
        size: 5,
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
    } catch (error) {
      console.log(error)
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
      console.log(error)
    }
  }

  // Intersection Observer 콜백 함수
  const handleObserver = useCallback(
    (entries: any) => {
      const target = entries[0]
      if (target.isIntersecting) {
        if (next) {
          getInquiryBookmarkPosting(false)
        }
      }
    },
    [bookmarkData],
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
      <h4 className="text-center text-lg mb-3">즐겨찾기</h4>
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
            <tfoot ref={loader}></tfoot>
          </table>
        </div>
      </div>
    </>
  )
}
