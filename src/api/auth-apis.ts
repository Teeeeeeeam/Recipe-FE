import {
  JoinEmailAuthentication,
  JoinEmailValidation,
  Join,
  Login,
  JoinNicknameValidation,
  RefreshToken,
  Response,
  SearchLoginId,
  SearchPassword,
} from '@/types/auth'
import requester from './index'
import { getLocalStorage } from '@/lib/local-storage'

export const postLogin = async (id: string, password: string) => {
  const { payload } = await requester<Login>({
    method: 'post',
    url: `/api/login`,
    data: { loginId: id, password: password },
  })
  return payload.data
}

export const postRefreshToken = async () => {
  const refreshToken = getLocalStorage('refreshToken')
  const { payload } = await requester<RefreshToken>({
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
  const { payload } = await requester<Join>({
    method: 'post',
    url: `/api/join?code=${code}`,
    data: {
      username,
      nickname,
      password,
      passwordRe,
      loginId,
      email,
    },
  })
  return payload
}

export const postJoinIdValidation = async (loginId: string) => {
  const { payload } = await requester<Response>({
    method: 'post',
    url: `/api/join/register/validation`,
    data: { loginId },
  })
  return payload
}

export const postJoinNicknameValidation = async (nickname: string) => {
  const { payload } = await requester<JoinNicknameValidation>({
    method: 'post',
    url: `/api/join/nickname/validation`,
    data: { nickname },
  })
  return payload.data
}

export const postJoinEmailValidation = async (email: string) => {
  const { payload } = await requester<JoinEmailValidation>({
    method: 'post',
    url: '/api/join/email/validation',
    data: { email },
  })
  return payload.data
}

export const postJoinEmailAuthentication = async (email: string) => {
  const { payload } = await requester<Response>({
    method: 'post',
    url: `/api/join/email-confirmation?email=${email}`,
  })
  return payload
}

export const postJoinEmailAuthenticationCheck = async (
  email: string,
  code: string,
) => {
  const { payload } = await requester<JoinEmailAuthentication>({
    method: 'post',
    url: `/api/join/email-confirmation/verify?email=${email}&code=${code}`,
  })
  return payload.data
}

export const postSearchEmailAuthentication = async (email: string) => {
  const { payload } = await requester<Response>({
    method: 'post',
    url: `/api/search/email-confirmation/send?email=${email}`,
  })
  return payload
}

export const postSearchEmailAuthenticationCheck = async (
  email: string,
  code: string,
) => {
  const { payload } = await requester<JoinEmailAuthentication>({
    method: 'post',
    url: `/api/join/email-confirmation/verify?email=${email}&code=${code}`,
  })
  return payload.data
}

export const postSearchLoginId = async (
  username: string,
  email: string,
  code: string,
) => {
  const { payload } = await requester<SearchLoginId>({
    method: 'post',
    url: '/api/search/login-id',
    data: { username, email, code },
  })
  return payload
}

export const postSearchPassword = async (
  username: string,
  loginId: string,
  email: string,
  code: string,
) => {
  const { payload } = await requester<SearchPassword>({
    method: 'post',
    url: '/api/search/password',
    data: { username, loginId, email, code },
  })
  return payload.data
}

export const updatePassword = async (
  token: string,
  loginId: string,
  password: string,
  passwordRe: string,
) => {
  const { payload } = await requester<Response>({
    method: 'put',
    url: `/api/password/update?id=${token}`,
    data: { loginId, password, passwordRe },
  })
  return payload
}
