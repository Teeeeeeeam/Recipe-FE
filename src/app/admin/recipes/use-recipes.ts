'use client'
import { getRecipes } from '@/api/admin-apis'
import { RecipeDtoList } from '@/types/admin'
import { useState, useCallback, useEffect } from 'react'

interface Params {
  ingredients?: string
  title?: string
}

const useRecipes = (params: Params) => {
  const [recipes, setRecipes] = useState<RecipeDtoList[]>([])
  const [lastId, setLastId] = useState<number | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [initialLoading, setInitialLoading] = useState<boolean>(true)
  const { ingredients, title } = params

  const fetchRecipes = useCallback(async () => {
    if (!hasMore || loading) return
    setLoading(true)
    try {
      const res = await getRecipes(lastId, ingredients ?? null, title ?? null)
      const newRecipes = res.recipes
      if (newRecipes) {
        setRecipes((prev) => [...prev, ...newRecipes])
        setLastId(newRecipes[newRecipes.length - 1].id)
        setHasMore(res.nextPage)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      setInitialLoading(false)
    }
  }, [lastId, hasMore, ingredients, title])

  useEffect(() => {
    setRecipes([])
    setLastId(null)
    setHasMore(true)
    setInitialLoading(true)
    fetchRecipes()
  }, [ingredients, title])

  return { recipes, setRecipes, fetchRecipes, hasMore, loading, initialLoading }
}

export default useRecipes
