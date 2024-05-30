import { PostingDetailMember, PostingDetailRecipe } from '@/types/recipe'
import { createSlice } from '@reduxjs/toolkit'

interface InitState {
  create_at: null | string
  id: null | number
  postContent: null | string
  postCookingLevel: null | string
  postCookingTime: null | string
  postImageUrl: null | string
  postLikeCount: null | number
  postServing: null | string
  postTitle: null | string
  member: null | PostingDetailMember
  recipe: null | PostingDetailRecipe
}

const initialState: InitState = {
  create_at: null,
  id: null,
  postContent: null,
  postCookingLevel: null,
  postCookingTime: null,
  postImageUrl: null,
  postLikeCount: null,
  postServing: null,
  postTitle: null,
  member: null,
  recipe: null,
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
