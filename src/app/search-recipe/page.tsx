'use client'

import { getCategoryRecipe } from '@/api/recipe-apis'
import { Recipe } from '@/types/recipe'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function SearchRecipe() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Recipe[]>([])
  const [next, setNext] = useState<boolean>(false)
  const [lastId, setLastId] = useState<number | null>(null)

  const loader = useRef(null)

  async function getRecipeIds(isInit: boolean) {
    try {
      const result = await getCategoryRecipe(
        searchTerm,
        null,
        null,
        null,
        null,
        null,
        lastId,
        'DATE',
        false,
      )
      if (searchTerm === '') {
        alert('레시피 이름을 입력해주세요')
      } else {
        if (isInit) {
          setSearchResults(result.recipes)
        } else {
          setSearchResults((prev) => {
            const newData = result.recipes
            return [...prev, ...newData]
          })
        }
        if (result.recipes.length > 0) {
          const dataLastId = result.recipes[result.recipes.length - 1]?.id
          setLastId(dataLastId)
        }
        setNext(result.nextPage)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function handleSearch(e: any) {
    e.preventDefault()
    getRecipeIds(true)
  }

  function selectAddress(recipe: { id: number; title: string }) {
    window.opener.postMessage({ type: 'RECIPE_SELECTED', recipe }, '*')
  }

  const handleObserver = useCallback(
    (entries: any) => {
      const target = entries[0]
      if (target.isIntersecting) {
        if (next) {
          getRecipeIds(false)
        }
      }
    },
    [searchResults],
  )
  // Intersection Observer 설정
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    }
    const observer = new IntersectionObserver(handleObserver, option)
    if (loader.current) {
      observer.observe(loader.current)
    }
    return () => observer.disconnect()
  }, [handleObserver])

  return (
    <div className="bg-gray-50 min-h-screen p-6 font-sans">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">검색</h2>
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="검색어를 입력하세요"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                검색
              </button>
            </div>
          </form>
          <ul className="space-y-2">
            {searchResults.map((item, index) => (
              <li
                key={index}
                onClick={() => selectAddress(item)}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition duration-150 ease-in-out"
              >
                {item.title}
              </li>
            ))}
            <li ref={loader}></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
