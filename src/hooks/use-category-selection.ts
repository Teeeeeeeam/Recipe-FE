'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { debounce } from 'lodash'
type CategoryType = 'ingredient' | 'method' | 'dishType'
type CategoryQueryType = 'cat1' | 'cat2' | 'cat3'
interface Params {
  cat1?: string | null
  cat2?: string | null
  cat3?: string | null
}

const useCategorySelection = (params: Params) => {
  const [selectedIngredient, setSelectedIngredient] = useState<string[]>([])
  const [selectedMethod, setSelectedMethod] = useState<string[]>([])
  const [selectedDishType, setSelectedDishType] = useState<string[]>([])

  const router = useRouter()
  const { cat1, cat2, cat3 } = params

  useEffect(() => {
    setSelectedIngredient(!!cat1 ? cat1.split(',') : [])
    setSelectedMethod(!!cat2 ? cat2.split(',') : [])
    setSelectedDishType(!!cat3 ? cat3.split(',') : [])
  }, [cat1, cat2, cat3])

  const updateURL = useCallback(
    debounce((category: CategoryQueryType, value: string[]) => {
      const queryParams = new URLSearchParams(window.location.search)

      if (value.length > 0) {
        queryParams.set(category, value.join(','))
      } else {
        queryParams.delete(category)
      }
      router.push(`?${queryParams.toString()}`)
    }, 300),
    [],
  )

  const clickCategoryHandler = useCallback(
    (category: CategoryType, value: string) => {
      if (category === 'ingredient') {
        const newValue = selectedIngredient.includes(value)
          ? selectedIngredient.filter((el) => el !== value)
          : [...selectedIngredient, value]
        setSelectedIngredient(newValue)
        updateURL('cat1', newValue)
      } else if (category === 'method') {
        const newValue = selectedMethod.includes(value)
          ? selectedMethod.filter((el) => el !== value)
          : [...selectedMethod, value]
        setSelectedMethod(newValue)
        updateURL('cat2', newValue)
      } else if (category === 'dishType') {
        const newValue = selectedDishType.includes(value)
          ? selectedDishType.filter((el) => el !== value)
          : [...selectedDishType, value]
        setSelectedDishType(newValue)
        updateURL('cat3', newValue)
      }
    },
    [selectedIngredient, selectedMethod, selectedDishType, updateURL],
  )

  return {
    selectedIngredient,
    selectedMethod,
    selectedDishType,
    clickCategoryHandler,
  }
}

export default useCategorySelection
