import {
  postEmailAuthentication,
  postCodeEmailAuthentication,
} from '@/api/auth-apis'

export const handleEmailVerificationClick = async (email: string) => {
  try {
    const res = await postEmailAuthentication(email)
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
  code: string,
) => {
  try {
    const res = await postCodeEmailAuthentication(email, Number(code))
    if (res.isVerifyCode) {
      alert('인증이 완료되었습니다.')
    } else {
      alert('올바른 인증번호를 입력해주세요.')
    }
  } catch (err) {
    alert('올바른 인증번호를 입력해주세요.')
  }
}
