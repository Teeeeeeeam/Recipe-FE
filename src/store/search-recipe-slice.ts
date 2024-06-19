import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface SearchType {
  category: string | null
  value: string | string[] | null
}

const initialState: SearchType = {
  category: null,
  value: null,
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
