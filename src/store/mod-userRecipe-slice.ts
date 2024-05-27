import { DetailUserRecipe } from '@/app/list-page/user-recipes/[id]/page'
import { createSlice } from '@reduxjs/toolkit'

const initialState: { [key: string]: null } = {
  create_at: null,
  member: null,
  postContent: null,
  postCookingLevel: null,
  psotCookingTime: null,
  postImageUrl: null,
  postLikeCount: null,
  postServing: null,
  postTitle: null,
}

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
