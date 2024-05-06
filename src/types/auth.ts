export interface Response {
  success: boolean
  message: string
}
export interface Login extends Response {
  data: {
    accessToken: string
    refreshToken: string
  }
}

export interface Join extends Response {
  data: {
    username: string
    nickName: string
    password: string
    passwordRe: string
    loginId: string
    email: string
  }
}

export interface RefreshToken extends Response {
  data: string
}

export interface EmailValidation extends Response {
  data: {
    duplicateEmail: boolean
    useEmail: boolean
  }
}

export interface EmailAuthentication extends Response {
  data: {
    isVerifyCode: boolean
  }
}
