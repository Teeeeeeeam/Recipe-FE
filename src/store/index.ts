'use client'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { persistReducer, persistStore } from 'redux-persist'
import { WebStorage } from 'redux-persist/es/types'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'
import searchIDSlice from './search-id-slice'
import searchPwSlice from './search-password-slice'
import searchRecipeSlice from './search-recipe-slice'
import writeUserRecipeSlice from './write-userRecipe-slice'
import userInfoSlice from './user-info-slice'
import modUserRecipeSlice from './mod-userRecipe-slice'

const rootReducer = combineReducers({
  searchIdData: searchIDSlice.reducer,
  searchPwData: searchPwSlice.reducer,
  searchMain: searchRecipeSlice,
  writeRecipe: writeUserRecipeSlice,
  userInfo: userInfoSlice,
  modRecipe: modUserRecipeSlice,
})

const createPersistStorage = (): WebStorage => {
  const isServer = typeof window === 'undefined'
  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null)
      },
      setItem() {
        return Promise.resolve()
      },
      removeItem() {
        return Promise.resolve()
      },
    }
  }
  return createWebStorage('session')
}

const storage = createPersistStorage()

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userInfo', 'searchMain', 'writeRecipe', 'modRecipe'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
          'persist/FLUSH',
          'persist/PAUSE',
          'persist/PURGE',
        ],
        ignoredPaths: ['register', 'rehydrate'],
      },
    }),
})
const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { store, persistor }
