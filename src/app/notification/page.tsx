'use client'
import { deleteNotify, inquiryNotify } from '@/api/notify-apis'
import { RootState } from '@/store'
import { Notification } from '@/types/notify'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

export default function ViewRecipeLikes() {
  const [likeData, setLikeData] = useState<Notification[] | []>([])
  const [check, setCheck] = useState<string[] | []>([])
  const [next, setNext] = useState<boolean>(false)
  const [lastId, setLastId] = useState<string | undefined>(undefined)
  const [mount, setMount] = useState<boolean>(false)

  const userInfo = useSelector((state: RootState) => state.userInfo)
  const loader = useRef(null)

  useEffect(() => {
    getInquiryNotification(true)
  }, [mount])

  async function getInquiryNotification(isInit: boolean) {
    try {
      const options = {
        page: 0,
        size: 5,
        sort: [''].join(),
      }
      const result = await inquiryNotify(
        `/api/user/info/notification?${isInit === false && lastId ? `&last-id=${lastId}` : ''}`,
        options,
      )
      // lastId
      const dataLastId = String(
        result.data.notification[result.data.notification.length - 1].id,
      )
      if (isInit) {
        setLikeData(result.data.notification)
      } else {
        setLikeData((prev) => {
          const newData = result.data.notification
          return [...prev, ...newData]
        })
      }
      setLastId(dataLastId)
      setNext(result.data.hasNext)
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteNotificationHandler(
    group: boolean,
    thisIds: string | string[],
  ) {
    try {
      const delData = group ? thisIds : check
      await deleteNotify('/api/user/user/notification', delData)
      setMount(!mount)
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
          getInquiryNotification(false)
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
        <button
          type="button"
          onClick={() => deleteNotificationHandler(false, check)}
        >
          일괄삭제
        </button>
        <ul>
          {likeData.map((item) => {
            return (
              <li key={item.id} className="border px-5 mb-3">
                <ul className="flex justify-between grid-cols-3">
                  <li className="py-3">
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        e.target.checked
                          ? setCheck((prevs) => [...prevs, String(item.id)])
                          : setCheck((prevs) =>
                              prevs.filter((prev) => prev !== String(item.id)),
                            )
                      }
                    />
                  </li>
                  <li className="py-3">
                    <Link href="">{item.content}</Link>
                  </li>
                  <li className="py-3">
                    <button
                      type="button"
                      onClick={() =>
                        deleteNotificationHandler(true, String(item.id))
                      }
                    >
                      삭제
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
