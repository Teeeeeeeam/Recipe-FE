'use client'

import {
  postEmailAuthentication,
  postEmailAuthenticationCheck,
  postEmailValidation,
  postIdValidation,
  postJoin,
  postNicknameValidation,
} from '@/api/auth-apis'
import AuthButton from '@/components/common/auth-button'
import AuthInput from '@/components/common/auth-input'
import regExp from '@/lib/regexp'
import { useRouter } from 'next/navigation'
import { useState, FocusEvent } from 'react'

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
  const router = useRouter()

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
      if (confirm('회원가입이 완료되었습니다. 로그인을 진행해주세요')) {
        router.push('/user/login')
      }
    } catch (err) {
      setValidations((prevValidations) => ({
        ...prevValidations,
        id: id === '' ? '아이디: 필수 입력 정보입니다.' : prevValidations.id,
        password:
          password === ''
            ? '비밀번호: 필수 입력 정보입니다.'
            : prevValidations.password,
        verifyPassword:
          verifyPassword === ''
            ? '비밀번호 확인: 필수 입력 정보입니다.'
            : prevValidations.verifyPassword,
        username:
          username === ''
            ? '이름: 필수 입력 정보입니다.'
            : prevValidations.username,
        nickname:
          nickname === ''
            ? '닉네임: 필수 입력 정보입니다.'
            : prevValidations.nickname,
        email:
          email === ''
            ? '이메일: 필수 입력 정보입니다.'
            : prevValidations.email,
        certificationNumber:
          certificationNumber === ''
            ? '인증번호: 필수 입력 정보입니다.'
            : prevValidations.certificationNumber,
      }))
    }
  }

  const handleInputBlur = (
    event: FocusEvent<HTMLInputElement>,
    value: string,
    reg?: RegExp,
  ) => {
    const { id, name } = event.target
    if (reg) {
      if (!reg.test(value) && value.length > 0) {
        setValidations((prev) => ({
          ...prev,
          [id]: `${name}: 올바른 형식이 아닙니다.`,
        }))
      } else if (reg.test(value) || value.length === 0) {
        setValidations((prev) => ({
          ...prev,
          [id]: '',
        }))
      }
    } else {
      if (password !== value && value.length > 0) {
        setValidations((prev) => ({
          ...prev,
          [id]: `${name}: 비밀번호와 일치하지 않습니다.`,
        }))
      } else if (password === value || value.length === 0) {
        setValidations((prev) => ({
          ...prev,
          [id]: '',
        }))
      }
    }
  }

  const handleIdValidationClick = async () => {
    try {
      const res = await postIdValidation(id)
      if (res.success) {
        alert('사용 가능한 아이디 입니다.')
      }
    } catch (error) {
      alert('사용 불가능한 아이디 입니다.')
    }
  }

  const handleNicknameValidationClick = async () => {
    try {
      const res = await postNicknameValidation(nickname)
      if (res) {
        alert('사용 가능한 닉네임 입니다.')
      } else if (!res) {
        alert('사용 불가능한 닉네임 입니다.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleEmailVerificationClick = async () => {
    const validation = await postEmailValidation(email)
    if (validation.duplicateEmail && validation.useEmail) {
      await postEmailAuthentication(email)
      alert('인증번호가 해당 이메일로 발송되었습니다.')
    } else if (!validation.duplicateEmail && validation.useEmail) {
      alert('이미 등록된 이메일 입니다.')
    } else {
      setValidations({
        ...validations,
        email: '올바른 이메일 형식을 입력해주세요.',
      })
    }
  }

  const handleEmailAuthenticationCheckClick = async () => {
    try {
      const isVerified = await postEmailAuthenticationCheck(
        email,
        certificationNumber,
      )
      if (isVerified) {
        alert('인증이 완료 되었습니다.')
      }
    } catch (err) {
      alert('인증번호를 확인해주세요.')
    }
  }

  return (
    <form className="grow shrink space-y-1">
      <div>
        <label className="lable-text">아이디</label>
        <div className="grid grid-cols-[4fr_1fr] gap-x-2">
          <AuthInput
            type="text"
            id="id"
            name="아이디"
            placeholder="5~16자 , 대소문자, 숫자"
            state={id}
            setState={setId}
            validation={validations.id}
            onBlur={(e) => handleInputBlur(e, id, regExp.regExpId)}
          />
          <AuthButton type="button" onClick={handleIdValidationClick}>
            중복 확인
          </AuthButton>
        </div>
      </div>
      <div>
        <label className="lable-text">비밀번호</label>
        <AuthInput
          type="password"
          id="password"
          name="비밀번호"
          placeholder="8~16자 대문자, 특수문자 포함"
          state={password}
          setState={setPassword}
          validation={validations.password}
          onBlur={(e) => handleInputBlur(e, password, regExp.regExpPassword)}
        />
      </div>
      <div>
        <label className="lable-text">비밀번호 확인</label>
        <AuthInput
          type="password"
          id="verifyPassword"
          name="비밀번호 확인"
          placeholder="비밀번호 확인"
          state={verifyPassword}
          setState={setVerifyPassword}
          validation={validations.verifyPassword}
          onBlur={(e) => handleInputBlur(e, verifyPassword)}
        />
      </div>
      <div>
        <label className="lable-text">이름</label>
        <AuthInput
          type="text"
          id="username"
          name="이름"
          placeholder="2~6자 한글 이름"
          state={username}
          setState={setUsername}
          validation={validations.username}
          onBlur={(e) => handleInputBlur(e, username, regExp.regExpUsername)}
        />
      </div>
      <div>
        <label className="lable-text">닉네임</label>
        <div className="grid grid-cols-[4fr_1fr] gap-x-2">
          <AuthInput
            type="text"
            id="nickname"
            name="닉네임"
            placeholder="4~10자 한글, 대소문자 영어"
            state={nickname}
            setState={setNickname}
            validation={validations.nickname}
            onBlur={(e) => handleInputBlur(e, nickname, regExp.regExpNickname)}
          />
          <AuthButton type="button" onClick={handleNicknameValidationClick}>
            중복 확인
          </AuthButton>
        </div>
      </div>
      <div>
        <label className="lable-text">이메일</label>
        <div className="grid grid-cols-[4fr_1fr] gap-x-2">
          <AuthInput
            type="email"
            id="email"
            name="이메일"
            placeholder="이메일"
            state={email}
            setState={setEamil}
            validation={validations.email}
            onBlur={(e) => handleInputBlur(e, email, regExp.regExpEmail)}
          />
          <AuthButton type="button" onClick={handleEmailVerificationClick}>
            인증
          </AuthButton>
        </div>
      </div>
      <div>
        <label className="lable-text">인증번호 입력</label>
        <div className="grid grid-cols-[4fr_1fr] gap-x-2">
          <AuthInput
            type="text"
            id="certificationNumber"
            name="인증번호"
            placeholder="인증번호 입력"
            state={certificationNumber}
            setState={setCertificationNumber}
            validation={validations.certificationNumber}
          />
          <AuthButton
            type="button"
            onClick={handleEmailAuthenticationCheckClick}
          >
            확인
          </AuthButton>
        </div>
      </div>
      {Object.entries(validations).map(
        ([key, value]) =>
          value.length > 0 && (
            <p
              key={key}
              className="relative text-[11px] ml-[6px] leading-3 text-red-50"
            >
              <span className="absolute top-[4px] left-[-5px] dot inline-block"></span>
              {value}
            </p>
          ),
      )}
      <div className="pt-1">
        <AuthButton type="button" onClick={handleJoinClick}>
          회원가입
        </AuthButton>
      </div>
    </form>
  )
}

export default Join
