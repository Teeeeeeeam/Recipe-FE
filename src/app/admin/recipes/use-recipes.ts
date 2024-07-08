'use client'
import { getRecipes } from '@/api/admin-apis'
import { RecipeDtoList } from '@/types/admin'
import { useState, useCallback } from 'react'

interface SearchParams {
  ingredients?: string
  title?: string
}

const useRecipes = (searchParams: SearchParams) => {
  const [recipes, setRecipes] = useState<RecipeDtoList[]>([])
  const [lastId, setLastId] = useState<number | null>(null)
  const [hasMore, setHasMore] = useState(true)

  const { ingredients, title } = searchParams

  const fetchRecipes = useCallback(async () => {
    if (!hasMore) return
    try {
      const res = await getRecipes(lastId, ingredients ?? null, title ?? null)
      const newRecipes = res.recipes
      setRecipes((prev) => [...prev, ...newRecipes])
      setLastId(newRecipes[newRecipes.length - 1].id)
      setHasMore(res.nextPage)
    } catch (error) {
      console.log(error)
    }
  }, [lastId, hasMore, searchParams])

  return { recipes, setRecipes, fetchRecipes, hasMore }
}

export default useRecipes
