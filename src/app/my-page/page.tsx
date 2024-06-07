'use client'

import { enterMyPage } from '@/api/login-user-apis'
import { RootState } from '@/store'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export default function MyPage() {
  const [pw, setPw] = useState<string>('')
  const loginState = useSelector((state: RootState) => state.userInfo)
  const route = useRouter()
  const { loginType } = loginState
  if (loginType && loginType !== 'normal') {
    window.location.href = '/my-page/success'
  }

  async function getAccessRights(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const userData = {
      password: pw,
      loginId: loginState?.loginId,
      loginType: loginState?.loginType,
    }
    try {
      await enterMyPage('/api/user/info/valid', userData)
      // window.location.href = '/my-page/userInfo'
      route.push('/my-page/success')
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
