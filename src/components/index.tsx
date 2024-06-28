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
import Image from 'next/image'
import { HeaderSizeMobile, HeaderSizeWeb } from './header-responsive'

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
        await postLogout()
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
      <nav className="max-w-[1160px] flex flex-wrap items-center justify-between  px-6 py-4 shadow-sm mx-auto">
        <div className="md:grow-0">
          <h1>
            <Link
              href="/"
              className="flex h-full title-font font-medium items-center text-gray-900"
            >
              <Image
                src={'/logo.png'}
                alt="logo"
                width={40}
                height={40}
                priority
              />
              요리 공유소
            </Link>
          </h1>
        </div>
        <HeaderSizeWeb
          isSession={isSession}
          eventCount={eventCount}
          state={state}
          logOutBtn={logOutBtn}
        />
        <HeaderSizeMobile
          isSession={isSession}
          eventCount={eventCount}
          logOutBtn={logOutBtn}
        />
      </nav>
    </header>
  )
}
