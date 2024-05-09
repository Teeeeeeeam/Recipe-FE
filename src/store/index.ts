'use client'

import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import searchIDSlice from './search-id-slice'
import searchPwSlice from './search-password-slice'

const rootReducer = {
  searchIdData: searchIDSlice.reducer,
  searchPwData: searchPwSlice.reducer,
}

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
