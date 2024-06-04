import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface Visited {
  visited: boolean
  expiry: number | null
}

const initialState: Visited = {
  visited: false,
  expiry: null,
}

const visitedSlice = createSlice({
  name: 'visited',
  initialState,
  reducers: {
    isVisited: (state, action: PayloadAction<Visited>) => {
      state.visited = action.payload.visited
      state.expiry = action.payload.expiry
    },
  },
})

export const { isVisited } = visitedSlice.actions
export default visitedSlice.reducer
