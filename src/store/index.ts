'use client'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { persistReducer } from 'redux-persist'
import sessionStorage from 'redux-persist/es/storage/session'
import searchIDSlice from './search-id-slice'
import searchPwSlice from './search-password-slice'
import searchRecipeSlice from './search-recipe-slice'
import writeUserRecipeSlice from './write-userRecipe-slice'
import userInfoSlice from './user-info-slice'
import persistStore from 'redux-persist/es/persistStore'
// import modUserRecipeSlice from './mod-userRecipe-slice'

const rootReducer = combineReducers({
  searchIdData: searchIDSlice.reducer,
  searchPwData: searchPwSlice.reducer,
  searchMain: searchRecipeSlice,
  writeRecipe: writeUserRecipeSlice,
  userInfo: userInfoSlice,
  // modRecipe: modUserRecipeSlice,
})

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['userInfo'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['register', 'rehydrate'],
      },
    }),
})
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
