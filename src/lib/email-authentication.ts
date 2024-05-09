import {
  postSearchEmailAuthentication,
  postSearchEmailAuthenticationCheck,
} from '@/api/auth-apis'

export const handleEmailVerificationClick = async (email: string) => {
  try {
    const res = await postSearchEmailAuthentication(email)
    if (res.success) {
      alert('해당 이메일로 인증번호가 발송되었습니다.')
    } else {
      alert('등록되지 않은 이메일 입니다.')
    }
  } catch (err) {
    alert('등록되지 않은 이메일 입니다.')
  }
}

export const handleAuthenticationCheckClick = async (
  email: string,
  authentication: string,
) => {
  try {
    const res = await postSearchEmailAuthenticationCheck(email, authentication)
    if (res.isVerifyCode) {
      alert('인증이 완료되었습니다.')
    } else {
      alert('올바른 인증번호를 입력해주세요.')
    }
  } catch (err) {
    alert('올바른 인증번호를 입력해주세요.')
  }
}
