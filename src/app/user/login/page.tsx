'use client'

import { postLogin } from '@/api/auth-apis'
import AuthInput from '@/components/common/auth-input'
import { setLocalStorage } from '@/lib/local-storage'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const accessToken = params.get('access-token')
    const refreshToken = params.get('refresh-token')
    if (accessToken && refreshToken) {
      setLocalStorage('accessToken', accessToken)
      setLocalStorage('refreshToken', refreshToken)
      router.push('/')
    }
  }, [params])

  const handleLoginSubmit = async () => {
    if (!username || !password) {
      alert('아이디와 비밀번호를 입력하세요.')
    } else {
      try {
        const res = await postLogin(username, password)
        setLocalStorage('accessToken', res.accessToken)
        setLocalStorage('refreshToken', res.refreshToken)

        router.push('/')
      } catch (error) {
        alert('아이디와 비밀번호를 확인해주세요')
      }
    }
  }

  return (
    <div className="grow shrink px-2 space-y-2">
      <form
        className="grid grid-cols-[4fr_1fr] gap-x-4"
        onSubmit={(e) => {
          e.preventDefault()
          handleLoginSubmit()
        }}
      >
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
          className="px-2 text-sm md:text-md bg-green-100 text-white rounded-md hover:bg-green-150"
        >
          로그인
        </button>
      </form>
      <div className="flex pt-3 pb-2 text-sm border-b-[1.5px] border-green-100 gap-x-1">
        <Link href="/user/join">
          <p className="hover:text-green-150">회원가입</p>
        </Link>
        <p>|</p>
        <Link href="/user/id-inquiry">
          <p className="hover:text-green-150">아이디 / 비밀번호 찾기</p>
        </Link>
      </div>
      <div className="flex justify-center gap-x-4">
        <Link
          href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/naver`}
        >
          <Image
            src="/naver-icon.svg"
            alt="naver-icon"
            width={50}
            height={50}
            className="cursor-pointer transition-transform hover:scale-110"
            priority
          />
        </Link>
        <Link
          href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`}
        >
          <Image
            src="/kakao-icon.svg"
            alt="naver-icon"
            width={50}
            height={50}
            className="cursor-pointer transition-transform hover:scale-110"
            priority
          />
        </Link>
        <Image
          src="/google-icon.svg"
          alt="naver-icon"
          width={50}
          height={50}
          className="cursor-pointer transition-transform hover:scale-110"
          priority
        />
      </div>
    </div>
  )
}

export default Login
