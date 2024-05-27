'use client'
import { postRefreshToken } from '@/api/auth-apis'
import { checkUser } from '@/api/login-user-apis'
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '@/lib/local-storage'
import { LoginInfo, getLoginInfo } from '@/store/user-info-slice'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

export function Header() {
  const [session, setSession] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<LoginInfo | null>(null)

  const route = useRouter()
  const state = useSelector((state: any) => state.userInfo)
  const dispatch = useDispatch()

  // 로그인 성공일 때 받는 redux로 session을 변경(boolean), redux 저장
  useEffect(() => {
    setUserInfo(state)
    checkSession(state)
  }, [state])

  // localstorage에 token이 남아있다면 session을 변경(boolean), fetch데이터 저장
  useEffect(() => {
    const expiry = getLocalStorage('expiry')
    const current = Date.now()

    let token = getLocalStorage('accessToken')
    async function handler() {
      if (current > expiry) {
        const newAccessToken = await postRefreshToken()
        setLocalStorage('accessToken', newAccessToken)
        token = newAccessToken
      }
      const result = await checkUser('/api/userinfo', token)
      dispatch(getLoginInfo(result?.data))
      setUserInfo(result?.data)
      checkSession(result?.data)
    }
    if (token) {
      handler()
    }
  }, [])

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

  function logOutBtn() {
    const nullState = {
      id: null,
      loginId: null,
      loginType: null,
      nickName: null,
      roles: null,
    }
    setUserInfo(null)
    setSession(false)
    removeLocalStorage('accessToken')
    dispatch(getLoginInfo(nullState))
    route.push('/')
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
