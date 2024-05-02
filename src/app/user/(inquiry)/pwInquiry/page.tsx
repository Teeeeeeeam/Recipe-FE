'use client'
import AuthButton from '@/components/common/auth-button'
import AuthInput from '@/components/common/auth-input'
import { useState } from 'react'

const PwInquiry = () => {
  const [email, setEamil] = useState('')
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div className="mt-2 space-y-2">
      <AuthInput
        type="email"
        placeholder="이메일"
        state={email}
        setState={setEamil}
      />
      <AuthInput type="text" placeholder="아이디" state={id} setState={setId} />
      <AuthInput
        type="password"
        placeholder="비밀번호"
        state={password}
        setState={setPassword}
      />
      <AuthButton type="submit">비밀번호 찾기</AuthButton>
    </div>
  )
}

export default PwInquiry
