'use client'

import { getCategoryRecipe, getRecipeList } from '@/api/recipe-apis'
import {
  COOK_INGREDIENTS,
  COOK_METHODS,
  DISH_TYPES,
} from '@/app/admin/recipes/(recipe-management)/constants'
import CategorySelector from '@/app/category-selector'
import { RecipeFigure } from '@/components/recipe-and-posting/recipe-figure'
import RecipeSearchForm from '@/components/recipe/recipe-search-form'
import useCategorySelection from '@/hooks/use-category-selection'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { Recipe } from '@/types/recipe'
import { useEffect, useState } from 'react'

export default function MainRecipes({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [lastCount, setLastCount] = useState<number | null>(null)
  const [lastId, setLastId] = useState<number | null>(null)
  const [order, setOrder] = useState<'DATE' | 'LIKE'>('LIKE')
  const [hasMore, setHasMore] = useState<boolean>(true)
  const {
    selectedIngredient,
    selectedMethod,
    selectedDishType,
    clickCategoryHandler,
  } = useCategorySelection(searchParams)

  const { cat1, cat2, cat3, title, ingredients } = searchParams
  useEffect(() => {
    setRecipes([])
    getData()
  }, [cat1, cat2, cat3, title, ingredients])

  async function getData() {
    const newCat1 = !!cat1 ? cat1.split(' ') : null
    const newCat2 = !!cat2 ? cat2.split(' ') : null
    const newCat3 = !!cat3 ? cat3.split(' ') : null
    const newIngredients = !!ingredients ? ingredients.split(' ') : null

    try {
      if (!hasMore) return
      const res = await getCategoryRecipe(
        title ?? null,
        newIngredients ?? null,
        newCat1 ?? null,
        newCat2 ?? null,
        newCat3 ?? null,
        lastCount ?? null,
        lastCount === 0 ? lastId : null,
        order,
        false,
      )

      const newRecipes = res.recipes
      setHasMore(res.nextPage)
      lastCount !== null
        ? setRecipes((prev) => [...prev, ...newRecipes])
        : setRecipes(newRecipes)
      setLastCount(newRecipes[newRecipes.length - 1].likeCount)
      setLastId(newRecipes[newRecipes.length - 1].id)
    } catch (err) {
      console.log(err)
    }
  }
  const lastElementRef = useInfiniteScroll(getData, hasMore)

  function getLabelByValue(
    options: { label: string; value: string }[],
    value: string,
  ) {
    const option = options.find((option) => option.value === value)
    return option ? option.label : ''
  }
  return (
    <div>
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
      <RecipeSearchForm searchParams={searchParams} />
      {!!title && (
        <h2 className="font-semibold text-xl px-2 md:px-8 mb-2">{`"${title}"에 대한 결과`}</h2>
      )}
      <div className="flex flex-1 flex-wrap px-2 md:px-8  text-2xl">
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
      <div className="md:px-8 grid justify-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-5 my-1">
        <RecipeFigure recipes={recipes} />
        <div ref={lastElementRef} />
      </div>
    </div>
  )
}
