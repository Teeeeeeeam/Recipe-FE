'use client'
import { doBookmark, inquiryBookmark } from '@/api/login-user-apis'
import { RootState } from '@/store'
import { MyBookmark } from '@/types/user'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

export default function ViewBookmark() {
  const [likeData, setLikeData] = useState<MyBookmark[] | []>([])
  const [next, setNext] = useState<boolean>(false)
  const [lastId, setLastId] = useState<string | undefined>(undefined)
  const [mount, setMount] = useState<boolean>(false)

  const userInfo = useSelector((state: RootState) => state.userInfo)
  const loader = useRef(null)

  useEffect(() => {
    getInquiryLikePosting(true)
  }, [mount])
  console.log(likeData)
  async function getInquiryLikePosting(isInit: boolean) {
    try {
      const options = {
        page: 0,
        size: 5,
        sort: [''].join(),
      }
      const result = await inquiryBookmark(
        `/api/user/info/bookmark?${isInit === false && lastId ? `&last-id=${lastId}` : ''}`,
        options,
      )
      console.log(result)
      // lastId
      const dataLastId = String(
        result.data.bookmark_list[result.data.bookmark_list.length - 1]?.id,
      )
      if (isInit) {
        setLikeData(result.data.bookmark_list)
      } else {
        setLikeData((prev) => {
          const newData = result.data.bookmark_list
          return [...prev, ...newData]
        })
      }
      setLastId(dataLastId)
      setNext(result.data.hasNext)
    } catch (error) {
      console.log(error)
    }
  }

  async function cancelBookmark(thisId: number) {
    try {
      if (userInfo.id) {
        const options = {
          memberId: userInfo.id,
          recipeId: thisId,
        }
        await doBookmark(options)
        setMount(!mount)
      }
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
          getInquiryLikePosting(false)
        }
      }
    },
    [likeData],
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
        <ul>
          {likeData.map((item, index) => {
            return (
              <li key={item.id} className="border px-5 mb-3">
                <ul className="flex justify-between grid-cols-3">
                  <li className="py-3">{index + 1}</li>
                  <li className="py-3">
                    <Link href={`/list-page/user-recipes/${item.id}`}>
                      {item.title}
                    </Link>
                  </li>
                  <li className="py-3">
                    <button
                      type="button"
                      onClick={() => cancelBookmark(item.id)}
                    >
                      취소
                    </button>
                  </li>
                </ul>
              </li>
            )
          })}
        </ul>
        <div ref={loader} />
      </div>
    </div>
  )
}
