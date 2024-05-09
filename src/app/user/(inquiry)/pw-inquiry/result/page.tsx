'use client'

import { updatePassword } from '@/api/auth-apis'
import AuthButton from '@/components/common/auth-button'
import AuthInput from '@/components/common/auth-input'
import regExp from '@/lib/regexp'
import handleInputBlur from '@/lib/validation-check'
import { useAppSelector } from '@/store'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const PwInquiryResult = () => {
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  const [validations, setValidations] = useState<Record<string, string>>({
    password: '',
    verifyPassword: '',
  })

  const data = useAppSelector((state) => state.searchPwData)
  const router = useRouter()

  useEffect(() => {
    if (data.token) {
      console.log(data)
    } else {
      alert('잘못된 접근입니다.')
      router.push('/user/pw-inquiry')
    }
  }, [])

  const handlePasswordSubmit = async () => {
    try {
      if (data.token && data.loginId) {
        await updatePassword(data.token, data.loginId, password, verifyPassword)
        if (confirm('비밀번호 재설정이 완료되었습니다.')) {
          router.push('/user/login')
        }
      }
    } catch (err) {
      alert('올바른 비밀번호를 입력해주세요')
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handlePasswordSubmit()
      }}
    >
      <label>비밀번호 재설정</label>
      <div className="space-y-2">
        <AuthInput
          type="password"
          id="password"
          name="비밀번호"
          placeholder="8~16자 대문자, 특수문자 포함"
          state={password}
          setState={setPassword}
          validation={validations.password}
          onBlur={(e) =>
            handleInputBlur(e, password, setValidations, regExp.regExpPassword)
          }
        />
        <AuthInput
          type="password"
          id="verifyPassword"
          name="비밀번호 확인"
          placeholder="비밀번호 확인"
          state={verifyPassword}
          setState={setVerifyPassword}
          validation={validations.verifyPassword}
          onBlur={(e) =>
            handleInputBlur(e, verifyPassword, setValidations, null, password)
          }
        />
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
        <AuthButton type="submit">비밀번호 재설정</AuthButton>
      </div>
    </form>
  )
}

export default PwInquiryResult
