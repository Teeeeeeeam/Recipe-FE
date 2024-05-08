export interface Recipe extends Record<string, string | number> {
  id: number
  likeCount: number
  cookingLevel: string
  cookingTime: string
  imageUrl: string
  people: string
  title: string
}

export interface RecipeForMain {
  recipes: Recipe[]
  group: boolean
}

export interface DetailRecipe
  extends Record<string, string[] | CookStep[] | Recipe> {
  cookStep: CookStep[]
  ingredients: string[]
  recipe: Recipe
}
export type CookStep = {
  [key: string]: string
  cook_step_id: string
  cook_steps: string
}

export interface ThreeCookInfo {
  title: string
  imgUrl: string
  data: string
}
