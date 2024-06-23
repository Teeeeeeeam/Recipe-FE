'use client'

import AuthButton from '@/components/common/auth-button'
import AuthInput from '@/components/common/auth-input'
import {
  handleEmailCodeSendClick,
  handleEmailCodeValidationkClick,
} from '@/lib/email-authentication'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchData } from '@/store/search-id-slice'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const IdInquiry = () => {
  const [username, setUsername] = useState('')
  const [email, setEamil] = useState('')
  const [code, setCode] = useState('')

  const dispatch = useAppDispatch()
  const { data, error } = useAppSelector((state) => state.searchIdData)
  const router = useRouter()
  useEffect(() => {
    if (data) {
      router.push('/user/id-inquiry/result')
    }
    if (error) {
      alert('해당 이메일로 등록된 아이디가 존재하지 않습니다.')
    }
  }, [data, error])

  const handleSearchIdSubmit = () => {
    dispatch(fetchData({ username, email, code: Number(code) }))
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
        <label className="label-text">이름</label>
        <AuthInput
          type="text"
          placeholder="이름을 입력하세요"
          value={username}
          setValue={setUsername}
        />
      </div>
      <div>
        <label className="label-text">이메일</label>
        <div className="grid grid-cols-[4fr_1fr] gap-x-2">
          <AuthInput
            type="email"
            placeholder="이메일"
            value={email}
            setValue={setEamil}
          />
          <AuthButton
            type="button"
            onClick={() => handleEmailCodeSendClick(email)}
          >
            인증
          </AuthButton>
        </div>
      </div>
      <div>
        <label className="label-text">인증번호</label>
        <div className="grid grid-cols-[4fr_1fr] gap-x-2">
          <AuthInput
            type="text"
            placeholder="인증번호 입력"
            value={code}
            setValue={setCode}
          />
          <AuthButton
            type="button"
            onClick={() => handleEmailCodeValidationkClick(email, code)}
          >
            확인
          </AuthButton>
        </div>
      </div>
      <AuthButton type="submit">아이디 찾기</AuthButton>
    </form>
  )
}

export default IdInquiry
