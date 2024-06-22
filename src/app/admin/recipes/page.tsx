'use client'

import { deleteRecipe, getRecipes } from '@/api/admin-apis'
import AdminInput from '@/components/common/admin-input'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { RecipeDtoList } from '@/types/admin'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import useRecipes from './use-recipes'
import RecipeFilter from './recipe-filter'
import RecipeList from './recipe-list'
import { buildQueryString, updateUrlAndFetchMembers } from './url-utils'

const AdminRecipe = ({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) => {
  const { recipes, setRecipes, fetchRecipes, hasMore } =
    useRecipes(searchParams)

  const [searchInput, setSearchInput] = useState('')
  const [filter, setFilter] = useState('재료')

  const lastElementRef = useInfiniteScroll(fetchRecipes, hasMore)
  const handleSearchSubmit = () => {
    const queryString = buildQueryString(filter, searchInput)
    updateUrlAndFetchMembers(queryString, setRecipes, fetchRecipes)
  }

  useEffect(() => {
    const { ingredients, title } = searchParams
    if (title && title.length > 0) {
      setFilter('요리명')
      setSearchInput(title)
    } else if (ingredients && ingredients.length > 0) {
      setSearchInput(ingredients)
    }
  }, [searchParams])

  return (
    <div className="md:p-4 bg-gray-100">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSearchSubmit()
        }}
      >
        <RecipeFilter
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setFilter={setFilter}
          filter={filter}
        />
      </form>
      <RecipeList recipes={recipes} lastElementRef={lastElementRef} />
    </div>
  )
}

export default AdminRecipe
