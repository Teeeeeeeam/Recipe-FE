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

export interface JoinNicknameValidation extends Response {
  data: boolean
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

export interface SearchPassword extends Response {
  data: {
    token: string
    '회원 정보': boolean
    '이메일 인증': boolean
  }
}
