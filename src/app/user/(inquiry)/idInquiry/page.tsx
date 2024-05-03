'use client'

import AuthButton from '@/components/common/auth-button'
import AuthInput from '@/components/common/auth-input'
import { useState } from 'react'

const IdInquiry = () => {
  const [email, setEamil] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div className="mt-2 space-y-2">
      <AuthInput
        type="email"
        placeholder="이메일"
        state={email}
        setState={setEamil}
      />
      <AuthInput
        type="password"
        placeholder="비밀번호"
        state={password}
        setState={setPassword}
      />
      <AuthButton type="submit">아이디 찾기</AuthButton>
    </div>
  )
}

export default IdInquiry
