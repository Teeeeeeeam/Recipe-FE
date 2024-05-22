import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface LoginInfo {
  id: string | null
  loginId: string | null
  loginType: string | null
  nickName: string | null
  roles: string | null
}

const initialState: LoginInfo = {
  id: null,
  loginId: null,
  loginType: null,
  nickName: null,
  roles: null,
}

const userInfoSlice = createSlice({
  name: 'userInfoSlice',
  initialState,
  reducers: {
    getLoginInfo: (state, action: PayloadAction<LoginInfo>) => {
      state.id = action.payload.id
      state.loginId = action.payload.loginId
      state.loginType = action.payload.loginType
      state.nickName = action.payload.nickName
      state.roles = action.payload.roles
    },
  },
})

export const { getLoginInfo } = userInfoSlice.actions
export default userInfoSlice
