import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface SearchType {
  category: string | undefined
  value: string | undefined
}

const initialState: SearchType = {
  category: undefined,
  value: undefined,
}

const searchRecipeSlice = createSlice({
  name: 'searchMain',
  initialState,
  reducers: {
    postSearchState: (state, action: PayloadAction<SearchType>) => {
      return action.payload
    },
  },
})

export const { postSearchState } = searchRecipeSlice.actions
export default searchRecipeSlice.reducer
