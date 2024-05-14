'use client'
import { fetchAllAdminRecipe } from '@/api/recipe-apis'
import RecipeFigure from '@/components/recipeFigure'
import { Options, Recipe } from '@/types/recipe'
import { useEffect, useState } from 'react'

interface PaginationType {
  totalPage: number
  thisPage: number
  handlerPage: any
}

export default function MainRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [totalPage, setTotalPage] = useState<number>(0)
  const [thisPage, setThisPage] = useState<number>(0)

  const thisOption: Options = {
    ingredients: [].join(','),
    page: thisPage,
    size: 8,
    sort: [''].join(''),
  }

  useEffect(() => {
    async function handler() {
      try {
        const url = '/api/recipeV1'
        const result = await fetchAllAdminRecipe(url, thisOption)
        setRecipes(result.data.content)
        setTotalPage(result.data.totalPages)
      } catch (error) {
        console.log(error)
      }
    }
    handler()
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
  console.log(thisPage)

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
  const [inputNum, setInputNum] = useState<number>(0)
  return (
    <div className="flex justify-center">
      <form onSubmit={(e) => handlerPage(e, 'jump', inputNum)}>
        <button type="button" onClick={() => handlerPage('prev')}>
          prev
        </button>
        <input
          type="text"
          name="pageNum"
          onChange={(e: any) => setInputNum(Number(e.target.value))}
          defaultValue={String(thisPage + 1)}
        />
        <span>of {totalPage}</span>
        <button type="button" onClick={() => handlerPage('next')}>
          next
        </button>
      </form>
    </div>
  )
}
