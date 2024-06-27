import { useState, FocusEvent } from 'react'
import {
  postJoinEmailValidation,
  postJoinIdValidation,
  postJoin,
  postJoinNicknameValidation,
  postJoinEmailCode,
  postJoinEmailCodeValidation,
} from '@/api/auth-apis'
import { useRouter } from 'next/navigation'

interface FormData {
  id: string
  password: string
  verifyPassword: string
  username: string
  nickname: string
  email: string
  certificationNumber: string
}

export const useJoinForm = () => {
  const [formData, setFormData] = useState<FormData>({
    id: '',
    password: '',
    verifyPassword: '',
    username: '',
    nickname: '',
    email: '',
    certificationNumber: '',
  })

  const [validations, setValidations] = useState<
    Partial<Record<keyof FormData, string>>
  >({})
  const router = useRouter()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleInputBlur = (
    event: FocusEvent<HTMLInputElement>,
    reg?: RegExp,
  ) => {
    const { id, name, value } = event.target
    let message = ''
    if (reg) {
      message =
        reg.test(value) || value.length === 0
          ? ''
          : `${name}: 올바른 형식이 아닙니다.`
    } else if (id === 'verifyPassword') {
      message =
        formData.password !== value && value.length > 0
          ? `${name}: 비밀번호와 일치하지 않습니다.`
          : ''
    }
    setValidations((prev) => ({ ...prev, [id]: message }))
  }

  const handleJoinClick = async () => {
    const requiredFields: (keyof FormData)[] = [
      'id',
      'password',
      'verifyPassword',
      'username',
      'nickname',
      'email',
      'certificationNumber',
    ]
    const newValidations = requiredFields.reduce(
      (acc, field) => {
        acc[field] =
          formData[field] === '' ? `${field}: 필수 입력 정보입니다.` : ''
        return acc
      },
      {} as Partial<Record<keyof FormData, string>>,
    )

    setValidations(newValidations)

    if (Object.values(newValidations).some((v) => v)) return

    try {
      const code = Number(formData.certificationNumber)
      const res = await postJoin(
        formData.username,
        formData.nickname,
        formData.password,
        formData.verifyPassword,
        formData.id,
        formData.email,
        code,
      )
      if (confirm('회원가입이 완료되었습니다. 로그인을 진행해주세요')) {
        router.push('/user/login')
      }
    } catch (err) {
      alert('회원가입에 실패했습니다. 입력 정보를 확인해주세요.')
    }
  }

  const handleValidationClick = async (type: 'id' | 'nickname') => {
    try {
      if (type === 'id') {
        const res = await postJoinIdValidation(formData.id)
        if (res.success) alert('사용 가능한 아이디 입니다.')
      } else {
        await postJoinNicknameValidation(formData.nickname)
        alert('사용 가능한 닉네임 입니다.')
      }
    } catch (error) {
      alert(`사용 불가능한 ${type === 'id' ? '아이디' : '닉네임'} 입니다.`)
    }
  }

  const handleEmailValidationClick = async () => {
    try {
      const res = await postJoinEmailValidation(formData.email)
      if (res.duplicateEmail && res.blackListEmail && res.useEmail) {
        await postJoinEmailCode(formData.email)
        alert('인증번호가 해당 이메일로 발송되었습니다.')
      }
      if (!res.duplicateEmail) {
        alert('이미 등록된 이메일 입니다.')
        return
      }
      if (!res.blackListEmail) {
        alert('차단된 이메일 입니다.')
      }
      if (!res.useEmail) {
        alert('유효하지 않은 이메일 입니다.')
      }
    } catch (err) {
      setValidations((prev) => ({
        ...prev,
        email: '올바른 이메일을 입력해주세요.',
      }))
    }
  }

  const handleEmailAuthenticationCheckClick = async () => {
    try {
      const code = Number(formData.certificationNumber)
      const res = await postJoinEmailCodeValidation(formData.email, code)
      if (res.isExpired && res.isVerified) {
        alert('인증이 완료되었습니다.')
      }
      if (!res.isVerified) {
        alert('인증번호를 확인해주세요.')
        return
      }
      if (!res.isExpired) {
        alert('인증시간이 만료되었습니다.')
        return
      }
    } catch {
      alert('인증번호를 확인해주세요.')
    }
  }

  return {
    formData,
    setFormData,
    validations,
    handleInputChange,
    handleInputBlur,
    handleJoinClick,
    handleValidationClick,
    handleEmailValidationClick,
    handleEmailAuthenticationCheckClick,
  }
}
