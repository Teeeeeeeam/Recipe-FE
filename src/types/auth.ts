export interface Login {
  success: boolean
  message: string
  data: {
    accessToken: string
    refreshToken: string
  }
}
