import {
  EmailAuthentication,
  EmailValidation,
  Join,
  Login,
  RefreshToken,
  Response,
} from '@/types/auth'
import requester from './index'
import { getLocalStorage } from '@/lib/local-storage'

export const postLogin = async (id: string, password: string) => {
  const { status, headers, payload } = await requester<Login>({
    method: 'post',
    url: `/api/login`,
    data: { loginId: id, password: password },
  })
  return payload.data
}

export const postRefreshToken = async () => {
  const refreshToken = getLocalStorage('refreshToken')
  const { status, payload } = await requester<RefreshToken>({
    method: 'post',
    url: `/api/auth/refresh-token/validate`,
    headers: { RefreshToken: `Bearer ${refreshToken}` },
  })
  return payload.data
}

export const postJoin = async (
  username: string,
  nickname: string,
  password: string,
  passwordRe: string,
  loginId: string,
  email: string,
  code: string,
) => {
  const { status, headers, payload } = await requester<Join>({
    method: 'post',
    url: `/api/join?code=${code}`,
    data: {
      username,
      nickName: nickname,
      password,
      passwordRe,
      loginId,
      email,
    },
  })
  return payload
}

export const postEmailValidation = async (email: string) => {
  const { payload } = await requester<EmailValidation>({
    method: 'post',
    url: '/api/join/email/validation',
    data: { email },
  })
  return payload.data
}

export const postEmailAuthentication = async (email: string) => {
  const { payload } = await requester<Response>({
    method: 'post',
    url: `/api/join/email-confirmation?email=${email}`,
  })
  return payload
}

export const postEmailAuthenticationCheck = async (
  email: string,
  code: string,
) => {
  const { payload } = await requester<EmailAuthentication>({
    method: 'post',
    url: `/api/join/email-confirmation/verify?email=${email}&code=${code}`,
  })
  return payload.data
}
