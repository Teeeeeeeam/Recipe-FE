'use client'

import { enterMyPage } from '@/api/login-user-apis'
import { getLocalStorage, setLocalStorage } from '@/lib/local-storage'
import { RootState } from '@/store'
import axios, { AxiosError } from 'axios'
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
      getAccessRightsSocial()
      route.push('/my-page/success/user-info')
    }
    const now = new Date()
    const isExpiry = getLocalStorage('expiryMypage')
    if (isExpiry && now.getTime() < isExpiry) {
      route.push('/my-page/success/user-info')
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
        route.push('/my-page/success/user-info')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const statusCode = axiosError.response.status
          const res = axiosError.response.data as { message: string }
          if (statusCode === 400) {
            alert(res.message)
            setPw('')
          }
        }
      }
    }
  }
  async function getAccessRightsSocial() {
    try {
      const result = await enterMyPage({})
      console.log(result)
    } catch (error) {
      console.log(error)
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
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="block mb-4"
              />
              <div>
                <button
                  type="button"
                  onClick={() => route.back()}
                  className="bg-gray-100 px-4 py-2 rounded-md text-md"
                >
                  돌아가기
                </button>
                <button
                  type="submit"
                  onClick={(e) => getAccessRights(e)}
                  className=" px-7 py-2 ml-2 rounded-md bg-blue-50 text-white text-md font-semibold"
                >
                  확인
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
