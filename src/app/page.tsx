'use client'
import Link from 'next/link'
import { useEffect, useState, useMemo, useCallback } from 'react'
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
import { useRouter, useSearchParams } from 'next/navigation'
import Announcements from './announcement'
import {
  COOK_INGREDIENTS,
  COOK_METHODS,
  DISH_TYPES,
} from './admin/recipes/(recipe-management)/constants'
import CategorySelector from './category-selector'
import useCategorySelection from '@/hooks/use-category-selection'
import RecipeSearchForm from '@/components/recipe/recipe-search-form'

export default function Home() {
  //레시피 컨트롤러 GET
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [userPosting, setUserPosting] = useState<PostingFigure[]>([])
  // redux
  const dispatch = useDispatch<AppDispatch>()
  //
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams],
  )
  const { cat1, cat2, cat3, ingredients } = params

  const {
    selectedIngredient,
    selectedMethod,
    selectedDishType,
    clickCategoryHandler,
  } = useCategorySelection(params)
  useEffect(() => {
    getData()
  }, [cat1, cat2, cat3, ingredients])

  const getData = useCallback(async () => {
    const option = {
      size: 3,
    }
    try {
      if (!!cat1 || !!cat2 || !!cat3 || !!ingredients) {
        const newCat1 = !!cat1 ? cat1.split(',') : null
        const newCat2 = !!cat2 ? cat2.split(',') : null
        const newCat3 = !!cat3 ? cat3.split(',') : null
        const newIngredients = !!ingredients ? ingredients.split(',') : null

        const result = await getCategoryRecipe(
          null,
          newIngredients ?? null,
          newCat1 ?? null,
          newCat2 ?? null,
          newCat3 ?? null,
          null,
          null,
          'LIKE',
          true,
        )
        setRecipes(result.recipes)
      } else {
        const result = await getHomeRecipe()
        setRecipes(result.data.recipes)
      }
      const result_posting = await getHomePosting(option)
      setUserPosting(result_posting.data.post)
    } catch (error) {
      console.log(error)
    }
  }, [cat1, cat2, cat3, ingredients])

  const handleRouting = () => {
    const query: any = {}
    if (!!cat1) {
      query.cat1 = cat1
    }
    if (!!cat2) {
      query.cat2 = cat2
    }
    if (!!cat3) {
      query.cat3 = cat3
    }

    if (!!ingredients) {
      query.ingredients = ingredients
    }

    const queryString = new URLSearchParams(query).toString()
    router.push(`/list-page/main-recipes?${queryString}`)
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
        <RecipeSearchForm params={params} />
        <div className="flex justify-between items-center px-2 md:px-8 mb-2 text-2xl">
          <div className="flex flex-1 flex-wrap">
            {selectedIngredient.map((value, idx) => (
              <div key={idx} className="font-semibold">
                <span className="px-1 py-1 mb-2">
                  {getLabelByValue(COOK_INGREDIENTS, value)}
                </span>
                <span>{idx < selectedIngredient.length - 1 && '+'}</span>
              </div>
            ))}
            {selectedIngredient.length > 0 && selectedMethod.length > 0 && (
              <span>{' > '}</span>
            )}
            {selectedMethod.map((value, idx) => (
              <div key={idx} className="font-semibold">
                <span className="px-1 py-1 mb-2">
                  {getLabelByValue(COOK_METHODS, value)}
                </span>
                <span>{idx < selectedMethod.length - 1 && '+'}</span>
              </div>
            ))}
            {(selectedIngredient.length > 0 || selectedMethod.length > 0) &&
              selectedDishType.length > 0 && <span>{' > '}</span>}
            {selectedDishType.map((value, idx) => (
              <div key={idx} className="font-semibold">
                <span className="px-1 py-1 mb-2">
                  {getLabelByValue(DISH_TYPES, value)}
                </span>
                <span>{idx < selectedDishType.length - 1 && '+'}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="px-2 py-1 bg-blue-50 hover:bg-blue-150 rounded-md text-[16px] text-white"
            onClick={handleRouting}
          >
            더보기
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2 md:px-8 md:pb-8">
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
