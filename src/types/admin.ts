import { Response } from './auth'

export interface Recipe extends Response {
  data: { recipeDtoList: RecipeDtoList[]; nextPage: boolean }
}

export interface RecipeData {
  recipeDtoList: RecipeDtoList[]
  lastId: number
  nextPage: boolean
}

export interface RecipeDtoList {
  id: number
  imageUrl: string | null
  title: string | null
  cookingLevel: string
  people: string | null
  cookingTime: string
  likeCount: number
}
