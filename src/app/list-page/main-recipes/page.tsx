'use client'

import { getCategoryRecipe } from '@/api/recipe-apis'
import {
  COOK_INGREDIENTS,
  COOK_METHODS,
  DISH_TYPES,
} from '@/app/admin/recipes/(recipe-management)/constants'
import CategorySelector from '@/app/category-selector'
import { RecipeSkeletonLoader } from '@/components/layout/skeleton/main-skeleton'
import { RecipeFigure } from '@/components/recipe-and-posting/recipe-figure'
import RecipeSearchForm from '@/components/recipe/recipe-search-form'
import useCategorySelection from '@/hooks/use-category-selection'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { Recipe } from '@/types/recipe'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const MainRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [lastCount, setLastCount] = useState<number | null>(null)
  const [lastId, setLastId] = useState<number | null>(null)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const searchParams = useSearchParams()
  const params = Object.fromEntries(searchParams.entries())
  const { cat1, cat2, cat3, title, ingredients, order } = params

  const {
    selectedIngredient,
    selectedMethod,
    selectedDishType,
    clickCategoryHandler,
  } = useCategorySelection(params)

  const fetchGetCategoryRecipe = async () => {
    if (!hasMore || loading) return
    setLoading(true)
    const newIngredients = !!ingredients ? ingredients.split(',') : null

    try {
      const res = await getCategoryRecipe(
        title ?? null,
        newIngredients ?? null,
        selectedIngredient ?? null,
        selectedMethod ?? null,
        selectedDishType ?? null,
        order !== 'DATE' ? lastCount ?? null : null,
        lastCount === 0 ? lastId : null,
        !!order ? order : 'LIKE',
        false,
      )

      const newRecipes = res.recipes
      setRecipes((prev) =>
        lastId === null ? [...newRecipes] : [...prev, ...newRecipes],
      )
      setLastCount(newRecipes[newRecipes.length - 1]?.likeCount ?? null)
      setLastId(newRecipes[newRecipes.length - 1]?.id ?? null)
      setHasMore(res.nextPage)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setRecipes([])
    setLastCount(null)
    setLastId(null)
    setHasMore(true)
    setLoading(false)
  }, [cat1, cat2, cat3, title, ingredients, order])

  useEffect(() => {
    if (lastId === null && lastCount === null && hasMore) {
      fetchGetCategoryRecipe()
    }
  }, [lastId, lastCount, hasMore])

  const lastElementRef = useInfiniteScroll(
    fetchGetCategoryRecipe,
    hasMore,
    lastId as number,
  )

  const getLabelByValue = (
    options: { label: string; value: string }[],
    value: string,
  ) => {
    const option = options.find((option) => option.value === value)
    return option ? option.label : ''
  }
  const handleOrderChange = (newOrder: 'DATE' | 'LIKE') => {
    const queryParams = new URLSearchParams(window.location.search)
    queryParams.set('order', newOrder)
    router.push(`?${queryParams.toString()}`)
  }
  if (!recipes) return null
  return (
    <div className="bg-white">
      <div className="flex flex-col">
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
      {!!title && (
        <h2 className="font-semibold text-lg md:text-xl px-2 md:px-8 mb-2">{`"${title}"에 대한 결과`}</h2>
      )}
      <div className="flex justify-between px-2 md:px-8">
        <div className="flex flex-1 flex-wrap  text-xl  md:text-2xl">
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
        <div>
          <button
            className={`px-2 py-2 ${
              order === 'LIKE' || order === undefined
                ? 'font-bold'
                : 'font-normal'
            }`}
            onClick={() => handleOrderChange('LIKE')}
          >
            좋아요순
          </button>
          <button
            className={`px-2 py-2 ${
              order === 'DATE' ? 'font-bold' : 'font-normal'
            }`}
            onClick={() => handleOrderChange('DATE')}
          >
            최신순
          </button>
        </div>
      </div>

      {loading ? (
        <RecipeSkeletonLoader />
      ) : (
        <div className="md:px-8 grid justify-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-5 my-1">
          <RecipeFigure recipes={recipes} />
          <div ref={lastElementRef} />
        </div>
      )}
    </div>
  )
}

export default MainRecipes
