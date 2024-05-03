'use client'

import { postLogin } from '@/api/auth-apis'
import AuthInput from '@/components/common/auth-input'
import { setLocalStorage } from '@/lib/local-storage'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    if (!username && !password) {
      alert('아이디와 비밀번호를 입력하세요.')
    } else if (!username) {
      alert('아이디를 입력하세요.')
    } else if (!password) {
      alert('비밀번호를 입력하세요.')
    }
  }
  const handleLoginSubmit = async () => {
    try {
      const res = await postLogin(username, password)
      setLocalStorage('accessToken', res.data.accessToken)
      setLocalStorage('refreshToken', res.data.refreshToken)
    } catch (error) {
      alert('아이디와 비밀번호를 확인해주세요')
    }
  }
  return (
    <div className="grow shrink px-2 space-y-2">
      <div className="grid grid-cols-[4fr_1fr] gap-x-4 ">
        <div className="space-y-2">
          <AuthInput
            type="text"
            placeholder="아이디"
            state={username}
            setState={setUsername}
          />
          <AuthInput
            type="password"
            placeholder="비밀번호"
            state={password}
            setState={setPassword}
          />
        </div>
        <button
          type="submit"
          onClick={handleLoginSubmit}
          className="px-2 text-sm md:text-md bg-green-100 text-white rounded-md hover:bg-green-150"
        >
          로그인
        </button>
      </div>
      <div className="flex pt-3 pb-2 text-sm border-b-[1.5px] border-green-100 gap-x-1">
        <Link href="/user/join">
          <p className="hover:text-green-150">회원가입</p>
        </Link>
        <p>|</p>
        <Link href="/user/idInquiry">
          <p className="hover:text-green-150">아이디 / 비밀번호 찾기</p>
        </Link>
      </div>
      <div className="flex justify-center gap-x-4">
        <Image
          src="/naver-icon.svg"
          alt="naver-icon"
          width={50}
          height={50}
          className="cursor-pointer transition-transform hover:scale-110"
        />
        <Image
          src="/kakao-icon.svg"
          alt="naver-icon"
          width={50}
          height={50}
          className="cursor-pointer transition-transform hover:scale-110"
        />
        <Image
          src="/google-icon.svg"
          alt="naver-icon"
          width={50}
          height={50}
          className="cursor-pointer transition-transform hover:scale-110"
        />
      </div>
    </div>
  )
}

export default Login
