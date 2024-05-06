'use client'

import {
  postEmailAuthentication,
  postEmailAuthenticationCheck,
  postEmailValidation,
  postJoin,
} from '@/api/auth-apis'
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
  const [validations, setValidations] = useState({
    id: '',
    password: '',
    verifyPassword: '',
    username: '',
    nickname: '',
    email: '',
    certificationNumber: '',
  })
  //중복 확인
  //이메일 검증 아닐경우 => 메시지  data=>"duplicateEmail": true, "useEmail": true 일때만
  //이메일 인증 => 검증 완료되면 해당 이메일로 전송
  //이메일 인증 확인 => data => isVerifyCode :true
  //최종 submit은 이메일 인증번호 필요
  const handleJoinClick = async () => {
    try {
      const res = await postJoin(
        username,
        nickname,
        password,
        verifyPassword,
        id,
        email,
        certificationNumber,
      )
      console.log(res)
      alert('회원가입이 완료되었습니다.')
    } catch (err) {
      console.log(err)
    }
  }

  const handleEmailVerificationClick = async () => {
    const validation = await postEmailValidation(email)
    console.log(validation)
    if (validation.duplicateEmail && validation.useEmail) {
      await postEmailAuthentication(email)
      alert('인증번호가 해당 이메일로 발송되었습니다.')
    }
    if (!validation.duplicateEmail && validation.useEmail) {
      alert('이미 등록된 이메일 입니다.')
    } else {
      setValidations({
        ...validations,
        email: '올바른 이메일 형식을 입력해주세요.',
      })
      console.log(validations)
    }
  }

  const handleEmailAuthenticationCheckClick = async () => {
    const isVerified = await postEmailAuthenticationCheck(
      email,
      certificationNumber,
    )
    console.log(isVerified)
  }

  return (
    <div className="grow shrink space-y-2">
      <div>
        <label>아이디</label>
        <div className="grid grid-cols-[4fr_1fr] gap-x-2">
          <AuthInput
            type="text"
            placeholder="4자리 이상, 대소문자, 숫자"
            state={id}
            setState={setId}
          />
          <AuthButton type="button">중복 확인</AuthButton>
        </div>
      </div>
      <div>
        <label>비밀번호</label>
        <AuthInput
          type="password"
          placeholder="6자리 이상, 대문자, 특수문자 포함"
          state={password}
          setState={setPassword}
        />
      </div>
      <div>
        <label>비밀번호 확인</label>
        <AuthInput
          type="password"
          placeholder="비밀번호 확인"
          state={verifyPassword}
          setState={setVerifyPassword}
        />
      </div>
      <div>
        <label>이름</label>
        <AuthInput
          type="text"
          placeholder="2~6글자 한글 이름"
          state={username}
          setState={setUsername}
        />
      </div>
      <div>
        <label>닉네임</label>
        <AuthInput
          type="text"
          placeholder="닉네임"
          state={nickname}
          setState={setNickname}
        />
      </div>
      <div>
        <label>이메일</label>
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
        <label>인증번호 입력</label>
        <div className="grid grid-cols-[4fr_1fr] gap-x-2">
          <AuthInput
            type="text"
            placeholder="인증번호 입력"
            state={certificationNumber}
            setState={setCertificationNumber}
          />
          <AuthButton
            type="button"
            onClick={handleEmailAuthenticationCheckClick}
          >
            확인
          </AuthButton>
        </div>
      </div>
      <AuthButton type="button" onClick={handleJoinClick}>
        회원가입
      </AuthButton>
    </div>
  )
}

export default Join
