import {
  JoinEmailAuthentication,
  Join,
  Login,
  RefreshToken,
  Response,
  SearchLoginId,
  LoginInfo,
} from '@/types/auth'
import requester from './index'
import { removeLocalStorage } from '@/lib/local-storage'

export const postLogin = async (id: string, password: string) => {
  removeLocalStorage('accessToken')
  const { payload } = await requester<Login>({
    method: 'post',
    url: `/api/login`,
    data: { loginId: id, password: password },
  })
  return payload.data
}

export const postLogout = async () => {
  const { payload } = await requester<Response>({
    method: 'post',
    url: 'api/logout',
  })
  return payload
}

export const postUserInfo = async () => {
  const { payload } = await requester<LoginInfo>({
    method: 'post',
    url: '/api/userinfo',
  })
  return payload.data
}

export const postRefreshToken = async () => {
  try {
    removeLocalStorage('accessToken')
    const { payload } = await requester<RefreshToken>({
      method: 'post',
      url: `/api/auth/refresh-token/validate`,
    })
    return payload.data
  } catch (err) {
    throw Error('에이 바보야')
  }
}

export const postJoin = async (
  username: string,
  nickname: string,
  password: string,
  passwordRe: string,
  loginId: string,
  email: string,
  code: number,
) => {
  const { payload } = await requester<Join>({
    method: 'post',
    url: `/api/join`,
    data: {
      username,
      nickname,
      loginId,
      email,
      password,
      passwordRe,
      code,
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
  const { payload } = await requester<Response>({
    method: 'post',
    url: `/api/join/nickname/validation`,
    data: { nickname },
  })
  return payload
}

export const postJoinEmailValidation = async (email: string) => {
  const { payload } = await requester<Response>({
    method: 'post',
    url: '/api/join/email/validation',
    data: { email },
  })
  return payload
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
  code: number,
) => {
  const { payload } = await requester<JoinEmailAuthentication>({
    method: 'post',
    url: `/api/join/email-confirmation/verify`,
    data: { email, code },
  })
  return payload.data
}

export const postEmailAuthentication = async (email: string) => {
  removeLocalStorage('accessToken')
  const { payload } = await requester<Response>({
    method: 'post',
    url: `/api/code/email-confirmation/send?email=${email}`,
  })
  return payload
}

export const postCodeEmailAuthentication = async (
  email: string,
  code: number,
) => {
  const { payload } = await requester<JoinEmailAuthentication>({
    method: 'post',
    url: `/api/code/email-confirmation/verify`,
    data: { email, code },
  })
  return payload.data
}

export const postSearchLoginId = async (
  username: string,
  email: string,
  code: number,
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
  code: number,
) => {
  const { payload } = await requester<Response>({
    method: 'post',
    url: '/api/search/password',
    data: { username, loginId, email, code },
  })
  return payload
}

export const updatePassword = async (
  loginId: string,
  password: string,
  passwordRe: string,
) => {
  const { payload } = await requester<Response>({
    method: 'put',
    url: `/api/password/update`,
    data: { loginId, password, passwordRe },
  })
  return payload
}

export const postVisit = async () => {
  const { payload } = await requester<Response>({
    method: 'post',
    url: '/api/visit',
  })
  return payload
}
