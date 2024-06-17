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

export interface LoginInfo extends Response {
  data: {
    id: string
    loginId: string
    nickName: string
    loginType: string
    roles: string
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

export interface JoinEmailValidation extends Response {
  data: {
    duplicateEmail: boolean
    useEmail: boolean
  }
}

export interface JoinEmailAuthentication extends Response {
  data: {
    isVerifyCode: boolean
  }
}

export interface SearchLoginId extends Response {
  data: {
    login_type: string
    login_info: string
  }[]
}

export interface SearchErrorMessage extends Response {
  data: {
    username: string
    code: string
    email: string
  }
}
