'use client'
// import { axiosInstance, interceptorId } from '@/api'
import { postLogout, postVisit } from '@/api/auth-apis'
import { checkUser } from '@/api/login-user-apis'
import { getLocalStorage, removeLocalStorage } from '@/lib/local-storage'
import { RootState, useAppDispatch, useAppSelector } from '@/store'
import { LoginInfo, getLoginInfo } from '@/store/user-info-slice'
import { isVisited } from '@/store/visited-slice'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export function Header() {
  const [session, setSession] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<LoginInfo | null>(null)

  const route = useRouter()
  const state = useAppSelector((state) => state.userInfo)
  const visitedInfo = useAppSelector((state) => state.visited)
  const dispatch = useAppDispatch()

  // 알림
  const [notifyContent, setNotifyContent] = useState<string[] | []>([])
  const [eventId, setEventId] = useState<string>('')

  useEffect(() => {
    const EventSource = EventSourcePolyfill || NativeEventSource
    const accessToken = getLocalStorage('accessToken')

    if (accessToken) {
      const eventSource = new EventSource(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/connect`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Connection: 'keep-alive',
          },
        },
      )

      eventSource.addEventListener(
        'open',
        function (e) {
          console.log('연결성공')
        },
        false,
      )
      eventSource.addEventListener(
        'message',
        function (e) {
          setEventId(e.lastEventId)
          setNotifyContent((prev) => [...prev, e.data])
        },
        false,
      )
      return () => {
        eventSource.close()
      }
    }
  }, [])

  // 로그인 성공일 때 받는 redux로 session을 변경(boolean), redux 저장
  useEffect(() => {
    setUserInfo(state)
    checkSession(state)
  }, [state])

  // localstorage에 token이 남아있다면 session을 변경(boolean), fetch데이터 저장
  useEffect(() => {
    let token = getLocalStorage('accessToken')
    async function handler() {
      try {
        const result = await checkUser('/api/userinfo', token)
        dispatch(getLoginInfo(result?.data))
        setUserInfo(result?.data)
        checkSession(result?.data)
      } catch (err) {
        console.log(err)
      }
    }
    if (token) {
      handler()
    }
  }, [])

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

  // fetch 또는 redux로 받아온 데이터(object)의 value가 null인지를 판단해 session을 변경(boolean)
  function checkSession(info: any) {
    for (let i in info) {
      if (info[i] !== null) {
        setSession(true)
        return
      }
      if (info[i] === null) {
        setSession(false)
        return
      }
    }
  }

  async function logOutBtn() {
    const nullState = {
      id: null,
      loginId: null,
      loginType: null,
      nickName: null,
      roles: null,
    }
    const memberId = state.id
    if (memberId) {
      await postLogout(memberId)
      setUserInfo(null)
      setSession(false)
      removeLocalStorage('accessToken')
      dispatch(getLoginInfo(nullState))
      window.location.href = '/'
    }
  }
  return (
    <header className="w-full fixed text-gray-600 body-font z-50 ">
      <div className="max-w-[1440px] mx-auto my-0 flex flex-wrap px-3 py-[20px] items-center justify-between bg-[#214D33]">
        <Link
          href="/"
          className="flex title-font font-medium items-center text-gray-900"
        >
          Recipe Radar
        </Link>
        {session && userInfo ? (
          <div className="min-w-[150px] flex items-center justify-between">
            <p className="text-gray-300">
              <Link
                href={userInfo.roles === 'ROLE_ADMIN' ? '/admin' : '/my-page'}
                className="w-full"
              >
                {userInfo.roles === 'ROLE_ADMIN'
                  ? '관리자'
                  : `${userInfo.nickName}님`}
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
