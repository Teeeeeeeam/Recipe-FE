import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SearchPwState extends Record<string, string | boolean | null> {
  loginId: string | null
}

const initialState: SearchPwState = {
  loginId: null,
}

const searchPwSlice = createSlice({
  name: 'searchPwSlice',
  initialState,
  reducers: {
    getPwInfo: (state, action: PayloadAction<SearchPwState>) => {
      state.loginId = action.payload.loginId
    },
  },
})

export const { getPwInfo } = searchPwSlice.actions
export default searchPwSlice
