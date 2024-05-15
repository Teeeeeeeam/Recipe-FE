'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { mainRecipeHandler } from '@/api/recipe-apis'
import RecipeFigure from '@/components/recipeFigure'
import { Recipe } from '@/types/recipe'
import { AppDispatch } from '@/store'
import { useDispatch } from 'react-redux'
import { postSearchState } from '@/store/search-recipe-slice'
import { useRouter } from 'next/navigation'

export default function Home() {
  //레시피 컨트롤러 GET
  const [recipes, setRecipes] = useState<Recipe[]>([])
  // 재료검색
  const [inputValue, setInputValue] = useState<string>('')
  const [inputCategory, setInputCategory] = useState<string>('All')
  // userRecipe Mocking
  const [userRecipe, setUserRecipe] = useState<Recipe[]>([])
  // redux
  const dispatch = useDispatch<AppDispatch>()
  //
  const router = useRouter()
  useEffect(() => {
    async function getData() {
      const result = await mainRecipeHandler(`/api/main/recipe`)
      setRecipes(result.data.recipe)
      // userRecipe Mocking
      setUserRecipe([
        result.data.recipe[0],
        result.data.recipe[1],
        result.data.recipe[2],
      ])
    }
    getData()
  }, [])

  function submitHandler(e: any): void {
    e.preventDefault()
    const newState = { category: inputCategory, value: inputValue }
    dispatch(postSearchState(newState))
    router.push('/list-page/main-recipes')
  }

  return (
    <div className="home-wrap max-w-[1300px] mx-auto my-0 lg:pt-10 md:pt-10">
      <div className="home-banner">
        <Banner />
      </div>
      <div className="home-recipe-recipe bg-[#222E50] bg-opacity-80 pt-10">
        <div className="flex items-center justify-center">
          <h3 className="mb-3 lg:text-3xl md:text-3xl text-2xl text-gray-300 rounded-lg">
            <Link href="/list-page/main-recipes">Search Recipe</Link>
          </h3>
        </div>
        <form
          onSubmit={(e) => submitHandler(e)}
          className="relative flex w-1/2 flex-col justify-between rounded-lg border p-2 sm:flex-row sm:items-center sm:p-0 mx-auto bg-white"
        >
          <div className="flex">
            <label className="h-14 rounded-md bg-gray-200" htmlFor="category">
              <select
                className="bg-transparent px-6 py-4 outline-none"
                name="category"
                id="category"
                onChange={(e) => setInputCategory(e.target.value)}
              >
                <option value="cookAll">전체</option>
                <option value="cookTitle">요리명</option>
                <option value="cookIngredient">재료명</option>
              </select>
            </label>
            <input
              type="name"
              name="search"
              onChange={(e) => {
                setInputValue(e.target.value)
              }}
              className="ml-1 h-14 w-full cursor-text rounded-md border py-4 pl-6 outline-none sm:border-0 sm:pr-40 sm:pl-12 focus:ring"
              placeholder="검색어를 입력해주세요"
            />
          </div>
          <button
            type="submit"
            className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-md bg-emerald-500 px-10 text-center align-middle text-base font-medium normal-case text-white outline-none sm:absolute sm:right-0 sm:mt-0 sm:mr-1 sm:w-32"
          >
            Search
          </button>
        </form>
        <div className="p-8 grid justify-center md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7 my-10">
          <RecipeFigure recipes={recipes} group={true} />
        </div>
      </div>
      <div className="home-users-recipe">
        <h3 className="text-3xl">회원 요리 게시글</h3>
        <div className="grid justify-center md:grid-cols-2 lg:grid-cols-6 gap-5 lg:gap-7 my-10">
          <div className="col-span-5 grid grid-cols-3 gap-5">
            <RecipeFigure recipes={userRecipe} group={false} />
          </div>
          <Link
            href=""
            className="col-span-1 col-end-auto bg-[#222E50] rounded-lg"
          >
            <p className="h-full flex justify-center items-center text-gray-300">
              더보기
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
export function Banner() {
  return (
    <>
      <section className="text-gray-600 body-font mb-12 py-3 bg-[#222E50] bg-opacity-80">
        <div className="mx-auto flex md:flex-row flex-col items-center justify-around">
          <div className="flex flex-col items-center text-center">
            <h1 className="mb-3 md:mb-0 lg:mb-0 title-font text-3xl font-medium text-[#78D8B6]">
              Recipe Radar
            </h1>
          </div>
          <div className="w-3/12">
            <img
              className="rounded"
              alt="hero"
              src="https://dummyimage.com/720x600"
            />
          </div>
        </div>
      </section>
    </>
  )
}
