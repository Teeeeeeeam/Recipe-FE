import { Recipe } from '@/types/admin'
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
