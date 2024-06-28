'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  getCategoryRecipe,
  getHomePosting,
  getHomeRecipe,
} from '@/api/recipe-apis'
import {
  RecipeFigure,
  UserPostingFigure,
} from '@/components/recipe-and-posting/recipe-figure'
import { PostingFigure, Recipe } from '@/types/recipe'
import { AppDispatch } from '@/store'
import { useDispatch } from 'react-redux'
import { postSearchState } from '@/store/search-recipe-slice'
import { useRouter } from 'next/navigation'
import Announcements from './announcement'
import {
  COOK_INGREDIENTS,
  COOK_METHODS,
  DISH_TYPES,
} from './admin/recipes/(recipe-management)/constants'
import CategorySelector from './category-selector'

export default function Home() {
  //레시피 컨트롤러 GET
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [userPosting, setUserPosting] = useState<PostingFigure[]>([])
  // 재료검색
  const [inputValue, setInputValue] = useState<string>('')
  const [ingredients, setIngredients] = useState<string[]>([])
  const [inputCategory, setInputCategory] = useState<string>('All')
  //
  const [selectedIngredient, setSelectedIngredient] = useState<string[]>([])
  const [selectedMethod, setSelectedMethod] = useState<string[]>([])
  const [selectedDishType, setSelectedDishType] = useState<string[]>([])
  // redux
  const dispatch = useDispatch<AppDispatch>()
  //
  const router = useRouter()
  useEffect(() => {
    getData()
  }, [selectedIngredient, selectedMethod, selectedDishType])
  async function getData() {
    const option = {
      size: 3,
    }
    try {
      if (
        !selectedIngredient.length &&
        !selectedMethod.length &&
        !selectedDishType.length
      ) {
        const result = await getHomeRecipe()
        setRecipes(result.data.recipes)
      } else {
        const result = await getCategoryRecipe(
          selectedIngredient ?? null,
          selectedMethod ?? null,
          selectedDishType ?? null,
        )
        setRecipes(result.recipes)
      }
      const result_posting = await getHomePosting(option)
      setUserPosting(result_posting.data.posts)
    } catch (error) {
      console.log(error)
    }
  }

  function enterHandler(e: any): void {
    e.preventDefault()
    if (inputCategory !== 'cookIngredient') {
      const newState = { category: inputCategory, value: inputValue }
      dispatch(postSearchState(newState))
      router.push('/list-page/main-recipes')
    }
    if (inputCategory === 'cookIngredient') {
      if (inputValue && ingredients.length < 5) {
        !ingredients.includes(inputValue) &&
          setIngredients([...ingredients, inputValue])
        setInputValue('')
      }
    }
  }

  function clickButtonHandler(e: any): void {
    if (inputCategory === 'cookIngredient') {
      if (ingredients.length >= 1) {
        const newState = { category: inputCategory, value: ingredients }
        dispatch(postSearchState(newState))
      } else {
        const formattedInputArray = [inputValue]
        const newState = { category: inputCategory, value: formattedInputArray }
        dispatch(postSearchState(newState))
      }
      router.push('/list-page/main-recipes')
    } else {
      enterHandler(e)
    }
  }

  function deleteIngredient(item: string) {
    const newIngredients = ingredients.filter(
      (ingredient) => ingredient !== item,
    )
    setIngredients(newIngredients)
  }
  //

  function clickCategoryHandler(category: string, value: string) {
    if (category === 'ingredient') {
      if (selectedIngredient.includes(value)) {
        setSelectedIngredient((prev) => prev.filter((el) => el !== value))
      } else {
        setSelectedIngredient((prev) => [...prev, value])
      }
    } else if (category === 'method') {
      if (selectedMethod.includes(value)) {
        setSelectedMethod((prev) => prev.filter((el) => el !== value))
      } else {
        setSelectedMethod((prev) => [...prev, value])
      }
    } else if (category === 'dishType') {
      if (selectedDishType.includes(value)) {
        setSelectedDishType((prev) => prev.filter((el) => el !== value))
      } else {
        setSelectedDishType((prev) => [...prev, value])
      }
    }
  }

  function getLabelByValue(
    options: { label: string; value: string }[],
    value: string,
  ) {
    const option = options.find((option) => option.value === value)
    return option ? option.label : ''
  }

  return (
    <div className="home-wrap max-w-[1300px] mx-auto my-0 lg:pt-10 md:pt-10">
      <div className="mx-auto mb-6">
        <Announcements />
      </div>
      <div className="home-recipe-recipe bg-white bg-opacity-80 pt-10">
        <div className="flex items-center justify-center">
          <h3
            onClick={() =>
              dispatch(
                postSearchState({
                  category: null,
                  value: null,
                }),
              )
            }
            className="mb-3 lg:text-2xl md:text-2xl text-2xl font-semibold text-black rounded-lg"
          >
            <Link href="/list-page/main-recipes">
              레시피를 카테고리별, 재료별로 검색해보세요!
            </Link>
          </h3>
        </div>
        <div className="flex flex-col mt-2">
          <CategorySelector
            label="재료별"
            options={COOK_INGREDIENTS.slice(1)}
            selectedValue={selectedIngredient}
            onClick={(value) => clickCategoryHandler('ingredient', value)}
          />
          <CategorySelector
            label="방법별"
            options={COOK_METHODS.slice(1)}
            selectedValue={selectedMethod}
            onClick={(value) => clickCategoryHandler('method', value)}
          />
          <CategorySelector
            label="종류별"
            options={DISH_TYPES.slice(1)}
            selectedValue={selectedDishType}
            onClick={(value) => clickCategoryHandler('dishType', value)}
          />
        </div>
        <form
          onSubmit={(e) => enterHandler(e)}
          className=" my-4 md:my-10 border-y bg-white p-6"
        >
          <div className="mb-6 flex flex-col justify-center md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <select
              className="w-full md:w-24 bg-transparent px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-50"
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
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              className="placeholder:text-gray-400 h-12 w-full md:w-96 rounded-lg px-4 font-medium focus:outline-none focus:border-blue-50 border border-gray-300"
              placeholder="검색어를 입력해주세요"
            />
            <button
              type="submit"
              className="w-full md:w-16  py-3 flex items-center justify-center rounded-lg bg-blue-50 text-white hover:bg-blue-100 transition duration-300"
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
              <div className="flex flex-wrap justify-center space-x-2 space-y-2 mt-4">
                {ingredients?.map((ingredient) => (
                  <p
                    key={ingredient}
                    className="text-sm font-medium text-gray-500 bg-gray-100 rounded-lg px-2 py-1 flex items-center"
                  >
                    {ingredient}
                    <span
                      className="ml-2 text-gray-400 cursor-pointer hover:text-red-600 transition duration-300"
                      onClick={() => deleteIngredient(ingredient)}
                    >
                      X
                    </span>
                  </p>
                ))}
              </div>
            </>
          )}
        </form>

        <div className="flex flex-wrap px-2 md:px-8 mb-2 md:mb-4 text-md md:text-xl">
          {selectedIngredient.map((value, idx) => (
            <div className="font-semibold">
              <span key={idx} className="px-1 py-1 mb-2">
                {getLabelByValue(COOK_INGREDIENTS, value)}
              </span>
              <span>{idx < selectedIngredient.length - 1 && '+'}</span>
            </div>
          ))}
          {selectedIngredient.length > 0 && selectedMethod.length > 0 && (
            <span>{' > '}</span>
          )}
          {selectedMethod.map((value, idx) => (
            <div className="font-semibold">
              <span key={idx} className="px-1 py-1 mb-2">
                {getLabelByValue(COOK_METHODS, value)}
              </span>
              <span>{idx < selectedMethod.length - 1 && '+'}</span>
            </div>
          ))}
          {(selectedIngredient.length > 0 || selectedMethod.length > 0) &&
            selectedDishType.length > 0 && <span>{' > '}</span>}
          {selectedDishType.map((value, idx) => (
            <div className="font-semibold">
              <span key={idx} className="px-1 py-1 mb-2">
                {getLabelByValue(DISH_TYPES, value)}
              </span>
              <span>{idx < selectedDishType.length - 1 && '+'}</span>
            </div>
          ))}
        </div>
        <RecipeFigure recipes={recipes} />
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
