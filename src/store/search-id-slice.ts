'use client'

import { postSearchLoginId } from '@/api/auth-apis'
import { SearchErrorMessage, SearchLoginId } from '@/types/auth'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

interface Attributes {
  username: string
  email: string
  code: number
}
export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (userData: Attributes, { rejectWithValue }) => {
    try {
      const { username, email, code } = userData
      const res = await postSearchLoginId(username, email, code)
      return res
    } catch (err: any) {
      const axiosError = err as AxiosError
      return rejectWithValue(axiosError.response?.data)
    }
  },
)

interface DataState {
  data: SearchLoginId | null
  loading: boolean
  error: SearchErrorMessage | null
}

const initialState: DataState = {
  data: null,
  loading: false,
  error: null,
}

const searchIDSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    resetDataState: (state) => {
      state.data = null
      state.loading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchData.fulfilled,
        (state, action: PayloadAction<SearchLoginId>) => {
          state.loading = false

          state.data = {
            ...action.payload,
            data: action.payload.data.filter(
              (el) => el.login_type === 'normal' || el.login_type === 'admin',
            ),
          }
          state.error = null
        },
      )
      .addCase(fetchData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
        state.data = null
        // console.log(action.payload)
      })
  },
})

export const { resetDataState } = searchIDSlice.actions
export default searchIDSlice
