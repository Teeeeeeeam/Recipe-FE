import { postEmailCode, postEmailCodeValidation } from '@/api/auth-apis'

export const handleEmailCodeSendClick = async (email: string) => {
  try {
    const res = await postEmailCode(email)
    if (res.success) {
      alert('해당 이메일로 인증번호가 발송되었습니다.')
    } else {
      alert('등록되지 않은 이메일 입니다.')
    }
  } catch (err) {
    alert('등록되지 않은 이메일 입니다.')
  }
}

export const handleEmailCodeValidationkClick = async (
  email: string,
  code: string,
) => {
  try {
    const res = await postEmailCodeValidation(email, Number(code))
    if (res.isVerified && res.isExpired) {
      alert('인증이 완료되었습니다.')
    } else if (!res.isExpired) {
      alert('인증 시간이 만료되었습니다.')
    }
  } catch (err) {
    alert('올바른 인증번호를 입력해주세요.')
  }
}
