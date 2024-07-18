import { PostingDetailMember, PostingDetailRecipe } from '@/types/recipe'
import { createSlice } from '@reduxjs/toolkit'

const initialState: null = null

const modRecipeSlice = createSlice({
  name: 'modRecipe',
  initialState,
  reducers: {
    recipeId: (state, action) => {
      return action.payload
    },
  },
})

export const { recipeId } = modRecipeSlice.actions
export default modRecipeSlice.reducer
