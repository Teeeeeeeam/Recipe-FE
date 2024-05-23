'use client'
import { fetchGetMethodParams } from '@/api/recipe-apis'
import RecipeFigure from '@/components/recipeFigure'
import { RootState } from '@/store'
import { Options, Recipe } from '@/types/recipe'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

interface PaginationType {
  totalPage: number
  thisPage: number
  handlerPage: any
}

export default function MainRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [totalPage, setTotalPage] = useState<number>(0)
  const [thisPage, setThisPage] = useState<number>(0)

  const state = useSelector((state: RootState) => state.searchMain)

  useEffect(() => {
    async function getData() {
      try {
        const url = '/api/recipeV1'
        const thisOption: Options = {
          page: thisPage,
          size: 8,
          sort: [''].join(''),
        }
        state.category === 'cookTitle'
          ? (thisOption.title = state.value)
          : state.category === 'cookIngredient'
            ? (thisOption.ingredients = [state.value].join(''))
            : ((thisOption.title = state.value),
              (thisOption.ingredients = state.value))
        const result = await fetchGetMethodParams(url, thisOption)
        setRecipes(result.data.content)
        setTotalPage(result.data.totalPages)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [thisPage])
  function handlerPage(e: any, str: string, num: number): void {
    e.preventDefault()
    if (str === 'prev' && thisPage > 0) {
      setThisPage(thisPage - 1)
    }
    if (str === 'next' && thisPage < totalPage - 1) {
      setThisPage(thisPage + 1)
    }
    if (str === 'jump' && num >= 0 && num - 1 < totalPage) {
      setThisPage(num - 1)
    }
  }
  return (
    <div className="">
      <div className="p-8 grid justify-center md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7 my-10">
        <RecipeFigure recipes={recipes} group={true} />
      </div>
      <Pagination
        totalPage={totalPage}
        thisPage={thisPage}
        handlerPage={handlerPage}
      />
    </div>
  )
}

export function Pagination({
  totalPage,
  thisPage,
  handlerPage,
}: PaginationType) {
  const [inputValue, setInputValue] = useState<number>(thisPage)
  return (
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
  )
}
