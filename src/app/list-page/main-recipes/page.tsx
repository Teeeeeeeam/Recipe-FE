'use client'

import { getRecipeList } from '@/api/recipe-apis'
import { RecipeFigure } from '@/components/recipe-figure'
import { RootState } from '@/store'
import { Option, Recipe } from '@/types/recipe'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function MainRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [totalPage, setTotalPage] = useState<number>(0)
  const [thisPage, setThisPage] = useState<number>(0)
  const [inputValue, setInputValue] = useState<number>(thisPage)

  const state = useSelector((state: RootState) => state.searchMain)

  useEffect(() => {
    getData()
  }, [thisPage])

  async function getData() {
    try {
      const option: Option = {
        page: thisPage,
        size: 8,
      }
      if (state.category === 'cookTitle' && typeof state.value === 'string') {
        option.title = state.value
      } else if (state.category === 'cookIngredient') {
        option.ingredients = [state.value].join('')
      } else if (state.category === 'All' && typeof state.value === 'string') {
        option.title = state.value
        option.ingredients = [state.value].join('')
      }
      const result = await getRecipeList(option)
      setRecipes(result.data.recipes)
      setTotalPage(result.data.totalPage)
    } catch (error) {
      console.log(error)
    }
  }

  function handlerPage(e: any, str: string, num?: number): void {
    e.preventDefault()
    if (str === 'prev' && thisPage > 0) {
      setThisPage(thisPage - 1)
    }
    if (str === 'next' && thisPage < totalPage - 1) {
      setThisPage(thisPage + 1)
    }
    if (str === 'jump' && num! >= 0 && num! - 1 < totalPage) {
      setThisPage(num! - 1)
    }
  }
  return (
    <div>
      <div className=" min-h-screen p-8 grid justify-center md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-5 my-1">
        <RecipeFigure recipes={recipes} />
      </div>
      <div className="w-full flex justify-center space-x-2 py-2">
        <button
          type="button"
          onClick={(e) => handlerPage(e, 'prev')}
          className="flex items-center space-x-1 font-medium hover:text-blue-600"
        >
          prev
        </button>
        <form onSubmit={(e) => handlerPage(e, 'jump', inputValue)}>
          <input
            type="text"
            name="pageNum"
            onChange={(e: any) => setInputValue(Number(e.target.value))}
            placeholder={String(thisPage + 1)}
          />
          <span>of {totalPage}</span>
        </form>
        <button
          type="button"
          onClick={(e) => handlerPage(e, 'next')}
          className="flex items-center space-x-1 font-medium hover:text-blue-600"
        >
          next
        </button>
      </div>
    </div>
  )
}
