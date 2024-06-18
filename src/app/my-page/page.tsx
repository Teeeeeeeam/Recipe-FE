'use client'

import { enterMyPage } from '@/api/login-user-apis'
import { getLocalStorage, setLocalStorage } from '@/lib/local-storage'
import { RootState } from '@/store'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function MyPage() {
  const [pw, setPw] = useState<string>('')

  const loginState = useSelector((state: RootState) => state.userInfo)
  const route = useRouter()
  const { loginId, loginType } = loginState

  useEffect(() => {
    if (loginType && loginType !== 'normal') {
      window.location.href = '/my-page/success'
    }
    const now = new Date()
    const isExpiry = getLocalStorage('expiryMypage')
    if (isExpiry && now.getTime() < isExpiry) {
      route.push('/my-page/success')
    }
  }, [])

  function setAccessMypage() {
    const timeEnter = new Date()
    const timeExpiry = new Date(timeEnter.getTime() + 15 * 60 * 1000)
    setLocalStorage('expiryMypage', Number(timeExpiry))
  }

  async function getAccessRights(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    try {
      if (loginId && loginType) {
        const userData = {
          password: pw,
          loginId: loginState?.loginId,
          loginType: loginState?.loginType,
        }
        await enterMyPage(userData)
        setAccessMypage()
        route.push('/my-page/success')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.status
        if (errorCode === 400) {
          alert('비밀번호가 일치하지 않습니다.')
        }
      }
    }
  }

  return (
    <>
      {loginType === 'normal' && (
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center fixed top-0 right-0 bottom-0 left-0">
          <div className="bg-white px-10 py-14 rounded-md text-center">
            <p className="text-xl mb-4 font-bold text-slate-500">
              로그인 비밀번호를 입력해주세요.
            </p>
            <form className="flex felx-wrap flex-col">
              <input
                type="password"
                onChange={(e) => setPw(e.target.value)}
                className="block mb-4"
              />
              <div>
                <button
                  type="button"
                  onClick={() => (window.location.href = '/')}
                  className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => getAccessRights(e)}
                  className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
                >
                  Ok
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {loginType !== 'normal' && <div>loading</div>}
    </>
  )
}
