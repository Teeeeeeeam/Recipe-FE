'use client'

import { postLogout, postVisit } from '@/api/auth-apis'
import { checkUser } from '@/api/login-user-apis'
import { getLocalStorage, removeLocalStorage } from '@/lib/local-storage'
import { useAppDispatch, useAppSelector } from '@/store'
import { getLoginInfo, resetState } from '@/store/user-info-slice'
import { isVisited } from '@/store/visited-slice'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import NotifyRecent from '@/components/notify-recent'

export default function Header() {
  const [isSession, setIsSession] = useState<boolean>(false)

  const state = useAppSelector((state) => state.userInfo)
  const visitedInfo = useAppSelector((state) => state.visited)
  const dispatch = useAppDispatch()
  const accessToken = getLocalStorage('accessToken')

  // access token이 있을 때 유저 정보를 확인하는 api요청
  useEffect(() => {
    setIsSession(false)
    dispatch(resetState())
    if (accessToken) {
      inquiryUser()
    }
  }, [accessToken])

  async function inquiryUser() {
    try {
      const result = await checkUser()
      dispatch(getLoginInfo(result.data))
      setIsSession(true)
    } catch (error) {
      console.log(error)
    }
  }

  async function logOutBtn() {
    const memberId = state.id
    try {
      if (memberId) {
        const eventSource = new EventSource(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/connect`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Last-Event-ID': eventId,
            },
          },
        )
        eventSource.close()
        await postLogout(memberId)
        setIsSession(false)
        removeLocalStorage('accessToken')
        removeLocalStorage('expiryMypage')
        dispatch(resetState())
        window.location.href = '/'
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 알림
  const [eventId, setEventId] = useState<string>('')
  const [eventCount, setEventCount] = useState<number>(0) // 이벤트 카운트를 위한 상태 변수

  const EventSource = EventSourcePolyfill || NativeEventSource
  const HEARTBEAT_TIMEOUT = 60 * 60 * 1000 // 1hour

  useEffect(() => {
    if (accessToken) {
      const eventSource = new EventSource(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/connect`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          heartbeatTimeout: HEARTBEAT_TIMEOUT, // heartbeatTimeout 설정
        },
      )

      eventSource.addEventListener(
        'open',
        function () {
          setEventCount(0)
        },
        false,
      )

      eventSource.addEventListener(
        'message',
        function (e) {
          const eventData = e.data // 응답값
          const eventId = e.lastEventId // 응답의 lastEventId

          setEventId(eventId)
          if (!eventData.includes('EventStream Created')) {
            setEventCount((prev) => prev + 1)
          }
        },
        false,
      )

      return () => {
        eventSource.close()
      }
    }
  }, [])

  // 방문
  useEffect(() => {
    const current = Date.now()
    const now = new Date()
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    ).getTime()
    const endOfDay =
      startOfDay + 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 59 * 1000
    const { visited, expiry } = visitedInfo

    async function fetchVisit() {
      if (visited && expiry && expiry > current) {
        return
      } else {
        try {
          const res = await postVisit()
          console.log(res)
          dispatch(isVisited({ visited: true, expiry: endOfDay }))
        } catch {
          dispatch(isVisited({ visited: true, expiry: endOfDay }))
        }
      }
    }
    fetchVisit()
  }, [dispatch, visitedInfo])

  return (
    <header className="w-full fixed text-gray-600 body-font z-50 bg-gray-300 ">
      <div className="max-w-[1440px] mx-auto my-0 flex flex-wrap px-3 py-[20px] items-center justify-between border-b ">
        <Link
          href="/"
          className="flex title-font font-medium items-center text-gray-900"
        >
          Recipe Radar
        </Link>
        {isSession && <NotifyRecent eventCount={eventCount} />}
        {isSession ? (
          <div className="min-w-[150px] flex items-center justify-between">
            <p className="text-black">
              <Link
                href={
                  state.roles === 'ROLE_ADMIN'
                    ? '/admin/dash-board'
                    : '/my-page'
                }
                className="w-full"
              >
                {state.roles === 'ROLE_ADMIN'
                  ? '관리자'
                  : `${state.nickName}님`}
              </Link>
            </p>
            <button
              type="button"
              onClick={() => logOutBtn()}
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base "
            >
              로그아웃
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base "
          >
            <Link href="/user/login">로그인/회원가입</Link>
          </button>
        )}
      </div>
    </header>
  )
}
