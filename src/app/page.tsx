'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getHomePosting, getHomeRecipe } from '@/api/recipe-apis'
import { RecipeFigure, UserPostingFigure } from '@/components/recipe-figure'
import { PostingFigure, Recipe } from '@/types/recipe'
import { AppDispatch } from '@/store'
import { useDispatch } from 'react-redux'
import { postSearchState } from '@/store/search-recipe-slice'
import { useRouter } from 'next/navigation'

export default function Home() {
  //레시피 컨트롤러 GET
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [userPosting, setUserPosting] = useState<PostingFigure[]>([])
  // 재료검색
  const [inputValue, setInputValue] = useState<string>('')
  const [ingredients, setIngredients] = useState<string[]>([])
  const [inputCategory, setInputCategory] = useState<string>('All')
  // redux
  const dispatch = useDispatch<AppDispatch>()
  //
  const router = useRouter()
  useEffect(() => {
    getData()
  }, [])
  async function getData() {
    const option = {
      size: 3,
    }
    try {
      const result = await getHomeRecipe()
      const result_posting = await getHomePosting(option)
      setRecipes(result.data.recipe)
      setUserPosting(result_posting.data.posts)
    } catch (error) {
      console.log(error)
    }
  }

  function submitHandler(e: any): void {
    e.preventDefault()
    if (inputCategory !== 'cookIngredient') {
      const newState = { category: inputCategory, value: inputValue }
      dispatch(postSearchState(newState))
      router.push('/list-page/main-recipes')
    }
    if (inputCategory === 'cookIngredient') {
      if (inputValue && ingredients.length < 5) {
        ingredients.includes(inputValue)
          ? null
          : setIngredients([...ingredients, inputValue])
        setInputValue('')
      }
    }
  }

  function submitClick(e: any): void {
    if (inputCategory === 'cookIngredient') {
      const newState = { category: inputCategory, value: ingredients }
      dispatch(postSearchState(newState))
      router.push('/list-page/main-recipes')
    } else {
      submitHandler(e)
    }
  }

  function deleteIngredient(item: string) {
    const newIngredients = ingredients.filter(
      (ingredient) => ingredient !== item,
    )
    setIngredients(newIngredients)
  }

  return (
    <div className="home-wrap max-w-[1300px] mx-auto my-0 lg:pt-10 md:pt-10">
      <div className="home-banner">
        <section className="text-gray-600 body-font mb-12 py-3 bg-white bg-opacity-80">
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
      </div>
      <div className="home-recipe-recipe bg-white bg-opacity-80 pt-10">
        <div className="flex items-center justify-center">
          <h3
            onClick={() =>
              dispatch(
                postSearchState({
                  category: undefined,
                  value: undefined,
                }),
              )
            }
            className="mb-3 lg:text-3xl md:text-3xl text-2xl text-black rounded-lg"
          >
            <Link href="/list-page/main-recipes">Search Recipe</Link>
          </h3>
        </div>
        <form
          onSubmit={(e) => submitHandler(e)}
          className="mx-2 my-10 rounded-xl border bg-white px-4 py-8"
        >
          <div className="mb-2 flex items-center">
            <div className="mr-1 w-full flex items-center">
              <select
                className="bg-transparent mr-1 px-6 py-3 outline-none border rounded-lg"
                name="category"
                id="category"
                onChange={(e) => setInputCategory(e.target.value)}
              >
                <option value="cookAll">전체</option>
                <option value="cookTitle">요리명</option>
                <option value="cookIngredient">재료명</option>
              </select>
              <input
                type="text"
                onChange={(e) => {
                  setInputValue(e.target.value)
                }}
                value={inputValue}
                className="placeholder:text-gray-400 h-12 w-full rounded-md px-4 font-medium focus:outline-none"
                placeholder="검색어를 입력해주세요"
              />
            </div>
            <button
              type="button"
              onClick={(e) => submitClick(e)}
              className="shrink-0 flex h-12 w-12 items-center justify-center rounded-lg bg-[#78D8B6] text-white hover:bg-[#68c9a7]"
            >
              검색
            </button>
          </div>
          {inputCategory === 'cookIngredient' && (
            <>
              {ingredients.length < 1 && (
                <p className="text-center text-sm font-medium text-gray-400">
                  검색어를 입력 후 엔터를 누르면 여기에 표시됩니다. &#40;최대
                  5개&#41;
                </p>
              )}
              <div className="space-x-1 flex flex-wrap w-full justify-center">
                {ingredients?.map((ingredient) => {
                  return (
                    <p
                      key={ingredient}
                      className="text-sm font-medium text-gray-400"
                    >
                      {ingredient}
                      <span
                        className="ml-1 text-gray-300 cursor-pointer hover:text-red-600"
                        onClick={() => deleteIngredient(ingredient)}
                      >
                        X
                      </span>
                    </p>
                  )
                })}
              </div>
            </>
          )}
        </form>
        <div className="p-8 grid justify-center md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7 my-10">
          <RecipeFigure recipes={recipes} />
        </div>
      </div>
      <div className="home-users-recipe">
        <h3 className="text-3xl">회원 요리 게시글</h3>
        <div className="grid justify-center md:grid-cols-2 lg:grid-cols-6 gap-5 lg:gap-7 my-10">
          <div className="col-span-5 grid grid-cols-3 gap-5">
            <UserPostingFigure recipes={userPosting} />
          </div>
          <Link
            href="/list-page/user-recipes"
            className="col-span-1 col-end-auto bg-[#D1D5DA] rounded-lg border border-[#C6C6C6]"
          >
            <p className="h-full flex justify-center items-center text-black">
              더보기
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
