'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
type CategoryType = 'ingredient' | 'method' | 'dishType'
type CategoryQueryType = 'cat1' | 'cat2' | 'cat3'
interface SearchParams {
  cat1?: string | null
  cat2?: string | null
  cat3?: string | null
}

const useCategorySelection = ({ cat1, cat2, cat3 }: SearchParams) => {
  const [selectedIngredient, setSelectedIngredient] = useState<string[]>([])
  const [selectedMethod, setSelectedMethod] = useState<string[]>([])
  const [selectedDishType, setSelectedDishType] = useState<string[]>([])

  const router = useRouter()
  // const { cat1, cat2, cat3 } = searchParams

  useEffect(() => {
    console.log(cat1)
    console.log(cat2)
    console.log(cat3)
    !!cat1 && setSelectedIngredient(cat1.split(','))
    !!cat2 && setSelectedMethod(cat2.split(','))
    !!cat3 && setSelectedDishType(cat3.split(','))
  }, [cat1, cat2, cat3])

  const updateURL = (category: CategoryQueryType, value: string[]) => {
    const queryParams = new URLSearchParams(window.location.search)
    if (value.length > 0) {
      queryParams.set(category, value.join(','))
    } else {
      queryParams.delete(category)
    }
    router.push(`?${queryParams.toString()}`)
  }

  const clickCategoryHandler = (category: CategoryType, value: string) => {
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
  }

  return {
    selectedIngredient,
    selectedMethod,
    selectedDishType,
    clickCategoryHandler,
  }
}

export default useCategorySelection
