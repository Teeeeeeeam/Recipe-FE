'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { mainRecipeHandler } from '@/api/recipe-apis'
import RecipeFigure from '@/components/recipeFigure'
import { Recipe } from '@/types/recipe'

export default function Home() {
  //레시피 컨트롤러 GET
  const [recipes, setRecipes] = useState<Recipe[]>([])
  // 재료검색
  const [ingredient, setIngredient] = useState<string>('')
  // userRecipe Mocking
  const [userRecipe, setUserRecipe] = useState<Recipe[]>([])

  useEffect(() => {
    getData()
  }, [])
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

  return (
    <div className="home-wrap max-w-[1300px] mx-auto my-0 lg:pt-10 md:pt-10">
      <div className="home-banner">
        <Banner />
      </div>
      <div className="home-recipe-recipe bg-[#222E50] bg-opacity-80 pt-10">
        <div className="flex items-center justify-center">
          <h3 className="mb-3 lg:text-3xl md:text-3xl text-2xl text-gray-300 rounded-lg">
            Search Recipe
          </h3>
        </div>
        <form className="flex flex-col flex-wrap">
          <input
            type="text"
            placeholder="재료를 입력해 주세요"
            // onChange={(e) => setIngredient(e.target.value)}
            className="w-1/2 py-3 border mx-auto mb-[24px] text-center rounded-lg"
          />
          <input
            type="submit"
            value="검색결과 보기"
            // onClick={(e) => submitHandler(e)}
            className="w-11/12 py-2 border mx-auto my-0 text-gray-300 rounded-lg"
          ></input>
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
