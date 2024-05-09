'use client'
import { postSearchPassword } from '@/api/auth-apis'
import AuthButton from '@/components/common/auth-button'
import AuthInput from '@/components/common/auth-input'
import {
  handleEmailVerificationClick,
  handleAuthenticationCheckClick,
} from '@/lib/email-authentication'
import { useAppDispatch, useAppSelector } from '@/store'
import { getPwInfo } from '@/store/search-password-slice'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const PwInquiry = () => {
  const [username, setUsername] = useState('')
  const [id, setId] = useState('')
  const [email, setEamil] = useState('')
  const [authentication, setAuthentication] = useState('')

  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state.searchPwData)

  const router = useRouter()

  const handleSearchPasswordSubmit = async () => {
    try {
      const res = await postSearchPassword(username, id, email, authentication)
      if (res.token && res.token.length > 0) {
        const pwInfo = { ...res, loginId: id }
        dispatch(getPwInfo(pwInfo))
        router.push('/user/pw-inquiry/result')
      } else if (res['회원 정보'] === false && res['이메일 인증'] === true) {
        alert('등록된 아이디가 없습니다.')
      }
    } catch (err) {
      alert('입력란을 모두 입력해주세요')
    }
  }
  return (
    <form
      className="mt-2 space-y-2"
      onSubmit={(e) => {
        e.preventDefault()
        handleSearchPasswordSubmit()
      }}
    >
      <div>
        <label className="label-text">이름</label>
        <AuthInput
          type="text"
          placeholder="이름 입력"
          state={username}
          setState={setUsername}
        />
      </div>
      <div>
        <label className="label-text">아이디</label>
        <AuthInput
          type="text"
          placeholder="아이디 입력"
          state={id}
          setState={setId}
        />
      </div>
      <div>
        <label className="label-text">이메일</label>
        <div className="grid grid-cols-[4fr_1fr] gap-x-2">
          <AuthInput
            type="email"
            placeholder="이메일 입력"
            state={email}
            setState={setEamil}
          />
          <AuthButton
            type="button"
            onClick={() => handleEmailVerificationClick(email)}
          >
            인증
          </AuthButton>
        </div>
      </div>
      <div>
        <label className="label-text">이메일</label>
        <div className="grid grid-cols-[4fr_1fr] gap-x-2">
          <AuthInput
            type="text"
            placeholder="인증번호 입력"
            state={authentication}
            setState={setAuthentication}
          />
          <AuthButton
            type="button"
            onClick={() =>
              handleAuthenticationCheckClick(email, authentication)
            }
          >
            확인
          </AuthButton>
        </div>
      </div>
      <AuthButton type="submit">비밀번호 찾기</AuthButton>
    </form>
  )
}

export default PwInquiry
