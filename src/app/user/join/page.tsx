'use client'
import AuthButton from '@/components/common/auth-button'
import AuthInput from '@/components/common/auth-input'
import { useState } from 'react'

const Join = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  const [username, setUsername] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEamil] = useState('')
  const [certificationNumber, setCertificationNumber] = useState('')

  return (
    <div className="space-y-2">
      <AuthInput type="text" placeholder="아이디" state={id} setState={setId} />
      <AuthInput
        type="password"
        placeholder="비밀번호"
        state={password}
        setState={setPassword}
      />
      <AuthInput
        type="password"
        placeholder="비밀번호 재입력"
        state={verifyPassword}
        setState={setVerifyPassword}
      />
      <AuthInput
        type="text"
        placeholder="이름"
        state={username}
        setState={setUsername}
      />
      <AuthInput
        type="text"
        placeholder="닉네임"
        state={nickname}
        setState={setNickname}
      />
      <div className="grid grid-cols-[4fr_1fr] gap-x-2">
        <AuthInput
          type="email"
          placeholder="이메일"
          state={email}
          setState={setEamil}
        />
        <AuthButton type="button">인증</AuthButton>
      </div>
      <div className="grid grid-cols-[4fr_1fr] gap-x-2">
        <AuthInput
          type="text"
          placeholder="인증번호 입력"
          state={certificationNumber}
          setState={setCertificationNumber}
        />
        <AuthButton type="button">확인</AuthButton>
      </div>
      <AuthButton type="submit">회원가입</AuthButton>
    </div>
  )
}

export default Join
