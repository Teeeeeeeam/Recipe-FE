'use client'
import { postSearchPassword } from '@/api/auth-apis'
import AuthButton from '@/components/common/auth-button'
import AuthInput from '@/components/common/auth-input'
import {
  handleEmailCodeSendClick,
  handleEmailCodeValidationkClick,
} from '@/lib/email-authentication'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store'
import { getPwInfo } from '@/store/search-password-slice'

const PwInquiry = () => {
  const [username, setUsername] = useState('')
  const [id, setId] = useState('')
  const [email, setEamil] = useState('')
  const [code, setCode] = useState('')

  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleSearchPasswordSubmit = async () => {
    if (!code || !username || !id || !email) {
      alert('입력란을 모두 입력해주세요')
    } else {
      try {
        const res = await postSearchPassword(username, id, email, Number(code))
        if (res.success) {
          dispatch(getPwInfo({ loginId: id }))
          router.push('/user/pw-inquiry/result')
        }
      } catch (err) {
        alert('등록된 아이디가 없습니다.')
      }
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
          value={username}
          setValue={setUsername}
        />
      </div>
      <div>
        <label className="label-text">아이디</label>
        <AuthInput
          type="text"
          placeholder="아이디 입력"
          value={id}
          setValue={setId}
        />
      </div>
      <div>
        <label className="label-text">이메일</label>
        <div className="grid grid-cols-[4fr_1fr] gap-x-2">
          <AuthInput
            type="email"
            placeholder="이메일 입력"
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
      <AuthButton type="submit">비밀번호 찾기</AuthButton>
    </form>
  )
}

export default PwInquiry
