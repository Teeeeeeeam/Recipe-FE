import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SearchPwState extends Record<string, string | boolean | null> {
  token: string | null
  loginId: string | null
  '회원 정보': boolean
  '이메일 인증': boolean
}

const initialState: SearchPwState = {
  token: null,
  loginId: null,
  '회원 정보': false,
  '이메일 인증': false,
}

const searchPwSlice = createSlice({
  name: 'searchPwSlice',
  initialState,
  reducers: {
    getPwInfo: (state, action: PayloadAction<SearchPwState>) => {
      state.token = action.payload.token
      state.loginId = action.payload.loginId
      state['회원 정보'] = action.payload['회원 정보']
      state['이메일 인증'] = action.payload['이메일 인증']
    },
  },
})

export const { getPwInfo } = searchPwSlice.actions
export default searchPwSlice
