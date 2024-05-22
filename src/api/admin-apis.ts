import { CookStep, Posts, Recipe, RecipeForm } from '@/types/admin'
import requester from './index'

export const getRecipe = async (
  lastId: number | null,
  title: string | null,
  ingredients: string | null,
) => {
  const { payload } = await requester<Recipe>({
    method: 'get',
    url: `/api/admin/recipe?${ingredients ? `ingredients=${ingredients}` : ''}${title ? `&title=${title}` : ''}${lastId !== null ? `&lastId=${lastId}` : ''}&page=0&size=10&sort=string`,
  })
  return payload.data
}

export const getDetailRecipe = async (id: string) => {
  const { payload } = await requester<RecipeForm>({
    method: 'get',
    url: `/api/recipe/${id}`,
  })
  return payload.data
}

export const postRecipe = async (
  title: string,
  cookLevel: string,
  people: string,
  ingredients: string[],
  cookTime: string,
  cookSteps: string[],
  file: File,
) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append(
    'recipeSaveRequest',
    JSON.stringify({
      title,
      cookLevel,
      people,
      ingredients,
      cookTime,
      cookSteps,
    }),
  )

  const { payload } = await requester<Response>({
    method: 'post',
    url: '/api/admin/save/recipe',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return payload
}

export const updateRecipe = async (
  title: string,
  cookLevel: string,
  people: string,
  ingredients: string[],
  cookTime: string,
  cookSteps: CookStep[],
  file: File,
) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append(
    'recipeSaveRequest',
    JSON.stringify({
      title,
      cookLevel,
      people,
      ingredients,
      cookTime,
      cookSteps,
    }),
  )

  const { payload } = await requester<Response>({
    method: 'post',
    url: '/api/admin/save/recipe',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return payload
}

export const deleteRecipe = async (id: number) => {
  const { payload } = await requester<Response>({
    method: 'delete',
    url: `/api/admin/recipe/${id}`,
  })
  return payload
}

export const getPosts = async () => {
  const { payload } = await requester<Posts>({
    method: 'get',
    url: '/',
  })
}
