'use client'

import {
  postSearchEmailAuthentication,
  postSearchEmailAuthenticationCheck,
} from '@/api/auth-apis'
import AuthButton from '@/components/common/auth-button'
import AuthInput from '@/components/common/auth-input'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchData } from '@/store/search-id-slice'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const IdInquiry = () => {
  const [username, setUsername] = useState('')
  const [email, setEamil] = useState('')
  const [authentication, setAuthentication] = useState('')

  const dispatch = useAppDispatch()
  const { data, error } = useAppSelector((state) => state.searchData)
  const router = useRouter()
  useEffect(() => {
    if (data) {
      router.push('/user/id-inquiry/result')
    }
    if (error) {
      alert('해당 이메일로 등록된 아이디가 존재하지 않습니다.')
    }
    console.log(data, error)
  }, [data, error])
  const handleEmailVerificationClick = async () => {
    try {
      const res = await postSearchEmailAuthentication(email)
      if (res.success) {
        alert('해당 이메일로 인증번호가 발송되었습니다.')
      } else {
        alert('등록되지 않은 이메일 입니다.')
      }
    } catch (err) {
      alert('등록되지 않은 이메일 입니다.')
    }
  }

  const handleAuthenticationCheckClick = async () => {
    try {
      const res = await postSearchEmailAuthenticationCheck(
        email,
        authentication,
      )
      if (res.isVerifyCode) {
        alert('인증이 완료되었습니다.')
      } else {
        alert('올바른 인증번호를 입력해주세요.')
      }
    } catch (err) {
      alert('올바른 인증번호를 입력해주세요.')
    }
  }

  const handleSearchIdSubmit = async () => {
    await dispatch(fetchData({ username, email, authentication }))
  }

  return (
    <form
      className="mt-2 space-y-2"
      onSubmit={(e) => {
        e.preventDefault()
        handleSearchIdSubmit()
      }}
    >
      <div>
        <label className="lable-text">이름</label>
        <AuthInput
          type="text"
          placeholder="이름을 입력하세요"
          state={username}
          setState={setUsername}
        />
      </div>
      <div>
        <label className="lable-text">이메일</label>
        <div className="grid grid-cols-[4fr_1fr] gap-x-2">
          <AuthInput
            type="email"
            placeholder="이메일"
            state={email}
            setState={setEamil}
          />
          <AuthButton type="button" onClick={handleEmailVerificationClick}>
            인증
          </AuthButton>
        </div>
      </div>
      <div>
        <label className="lable-text">인증번호</label>
        <div className="grid grid-cols-[4fr_1fr] gap-x-2">
          <AuthInput
            type="text"
            placeholder="인증번호 입력"
            state={authentication}
            setState={setAuthentication}
          />
          <AuthButton type="button" onClick={handleAuthenticationCheckClick}>
            확인
          </AuthButton>
        </div>
      </div>
      <AuthButton type="submit">아이디 찾기</AuthButton>
    </form>
  )
}

export default IdInquiry
