'use client'
import { getRecipes } from '@/api/recipe-apis'
import { RecipeFigure } from '@/components/recipe-figure'
import { RootState } from '@/store'
import { Options, Recipe } from '@/types/recipe'
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
      const thisOption: Options = {
        page: thisPage,
        size: 8,
      }
      state.category === 'cookTitle'
        ? (thisOption.title = state.value)
        : state.category === 'cookIngredient'
          ? (thisOption.ingredients = [state.value].join(''))
          : ((thisOption.title = state.value),
            (thisOption.ingredients = [state.value].join('')))
      const result = await getRecipes(thisOption)
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
    <div className="">
      <div className="p-8 grid justify-center md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7 my-10">
        <RecipeFigure recipes={recipes} />
      </div>
      <div className="flex justify-center">
        <form onSubmit={(e) => handlerPage(e, 'jump', inputValue)}>
          <button type="button" onClick={(e) => handlerPage(e, 'prev')}>
            prev
          </button>
          <input
            type="text"
            name="pageNum"
            onChange={(e: any) => setInputValue(Number(e.target.value))}
            placeholder={String(thisPage + 1)}
          />
          <span>of {totalPage}</span>
          <button type="button" onClick={(e) => handlerPage(e, 'next')}>
            next
          </button>
        </form>
      </div>
    </div>
  )
}
