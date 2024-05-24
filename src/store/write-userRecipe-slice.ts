import { Recipe } from '@/types/recipe'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InitType {
  [key: string]: string | number | undefined
}

const initialState: InitType = {
  id: undefined,
  likeCount: undefined,
  cookingLevel: undefined,
  cookingTime: undefined,
  imageUrl: undefined,
  people: undefined,
  title: undefined,
}

const writeRecipeSlice = createSlice({
  name: 'writeRecipe',
  initialState,
  reducers: {
    postWriteState: (state, action: PayloadAction<Recipe>) => {
      return action.payload
    },
  },
})

export const { postWriteState } = writeRecipeSlice.actions
export default writeRecipeSlice.reducer
