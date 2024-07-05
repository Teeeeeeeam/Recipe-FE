'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, FormEvent } from 'react'

const RecipeSearchForm = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | null }
}) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [inputIngredients, setInputIngredients] = useState<string[]>([])
  const [inputCategory, setInputCategory] = useState<string>('cookTitle')

  const router = useRouter()
  const { cat1, cat2, cat3, ingredients } = searchParams
  console.log(cat1, cat2, cat3)
  useEffect(() => {
    if (!!ingredients) {
      const newIngredients = ingredients.split(',')
      setInputIngredients(newIngredients)
    } else {
      setInputIngredients([])
    }
  }, [searchParams])

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

    if (inputCategory === 'cookTitle' && inputValue) {
      query.title = inputValue
      delete query.ingredients
    } else if (inputCategory === 'cookIngredient' && inputIngredients.length) {
      query.ingredients = inputIngredients.join(',')
      delete query.title
    }

    const queryString = new URLSearchParams(query).toString()
    router.push(`/list-page/main-recipes?${queryString}`)
  }

  const updateURL = (value: string[]) => {
    const queryParams = new URLSearchParams(window.location.search)
    if (value.length > 0) {
      queryParams.set('ingredients', value.join(','))
      queryParams.delete('title')
    } else {
      queryParams.delete('ingredients')
    }
    router.push(`?${queryParams.toString()}`)
  }

  const handleEnterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputCategory !== 'cookIngredient') {
      handleRouting()
    }
    if (inputCategory === 'cookIngredient') {
      if (inputValue && inputIngredients.length < 5) {
        if (!inputIngredients.includes(inputValue)) {
          const newIngredients = [...inputIngredients, inputValue]
          setInputIngredients([...inputIngredients, inputValue])
          updateURL(newIngredients)
          setInputValue('')
        }
      }
    }
  }

  const deleteIngredient = (item: string) => {
    const newIngredients = inputIngredients.filter(
      (ingredient) => ingredient !== item,
    )
    setInputIngredients(newIngredients)
  }

  return (
    <form
      onSubmit={(e) => handleEnterSubmit(e)}
      className=" my-4 md:my-10 border-y bg-white p-6"
    >
      <div className="mb-6 flex flex-col justify-center md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <select
          className="w-full md:w-24 bg-transparent px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-50"
          name="category"
          id="category"
          onChange={(e) => setInputCategory(e.target.value)}
        >
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
          onClick={handleRouting}
        >
          검색
        </button>
      </div>
      {inputCategory === 'cookIngredient' && (
        <>
          {inputIngredients.length < 1 && (
            <p className="text-center text-sm font-medium text-gray-400">
              검색어를 입력 후 엔터를 누르면 여기에 표시됩니다. &#40;최대
              5개&#41;
            </p>
          )}
          <div className="flex flex-wrap justify-center space-x-2 space-y-2 mt-4">
            {inputIngredients?.map((ingredient) => (
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
  )
}

export default RecipeSearchForm
