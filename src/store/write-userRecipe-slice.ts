import { Recipe } from '@/types/recipe'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface Init {
  direct: boolean | null
  id: number | null
  likeCount: number | null
  cookingLevel: string | null
  cookingTime: string | null
  imageUrl: string | null
  people: string | null
  title: string | null
  createAt?: string | null
}

const initialState: Init = {
  direct: null,
  id: null,
  likeCount: null,
  cookingLevel: null,
  cookingTime: null,
  imageUrl: null,
  people: null,
  title: null,
}

const writeRecipeSlice = createSlice({
  name: 'writeRecipe',
  initialState,
  reducers: {
    initWriteState: () => initialState,
    postWriteState: (state, action: PayloadAction<Init>) => {
      return action.payload
    },
  },
})

export const { postWriteState, initWriteState } = writeRecipeSlice.actions
export default writeRecipeSlice.reducer
