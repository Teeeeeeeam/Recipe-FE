import { Recipe } from '@/types/admin'
import requester from './index'

export const getRecipe = async (ingredients: string, lastId: number | null) => {
  const { payload } = await requester<Recipe>({
    method: 'get',
    url: `/api/recipe?ingredients=${ingredients.length > 0 ? ingredients : ''}${lastId !== null ? `&lastId=${lastId}` : ''}&page=0&size=10&sort=string`,
  })
  return payload.data
}
