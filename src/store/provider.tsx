'use client'

import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './index'
import { Provider } from 'react-redux'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function ReduxProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
