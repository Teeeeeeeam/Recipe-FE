'use client'
import { doBookmark, inquiryBookmark } from '@/api/login-user-apis'
import { MyBookmark } from '@/types/user'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

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
        <div className="rounded-lg p-4">
          <table className="w-full border-gray-200 table-fixed">
            <thead>
              <tr>
                <th className="p-2 w-[10%]">#</th>
                <th className="p-2 w-[80%]">제목</th>
                <th className="p-2 sm:w-[10%] w-[20%]">취소</th>
              </tr>
            </thead>
            <tbody className="">
              {bookmarkData.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td className="px-2 py-5 text-center ">{index + 1}</td>
                    <td className="px-2 py-5 text-center whitespace-nowrap text-ellipsis overflow-hidden">
                      <Link href={`/list-page/main-recipes/${item.id}`}>
                        {item.title}
                      </Link>
                    </td>
                    <td className="px-2 py-5 text-center">
                      <button
                        type="button"
                        onClick={() => cancelBookmark(item.id)}
                      >
                        취소
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
    </>
  )
}
