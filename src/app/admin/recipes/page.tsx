'use client'

import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { useState, useEffect } from 'react'
import useRecipes from './use-recipes'
import RecipeList from './recipe-list'
import { buildQueryString, updateUrlAndFetchMembers } from './url-utils'
import AdminFilter from '@/components/layout/admin-filter'
import AdminInput from '@/components/common/admin-input'
import { useSearchParams } from 'next/navigation'

const AdminRecipe = () => {
  const [searchInput, setSearchInput] = useState('')
  const [filter, setFilter] = useState('요리명')

  const searchParams = useSearchParams()
  const params = Object.fromEntries(searchParams.entries())

  const { recipes, setRecipes, fetchRecipes, hasMore } = useRecipes(params)
  const lastElementRef = useInfiniteScroll(fetchRecipes, hasMore)
  const handleSearchSubmit = () => {
    const queryString = buildQueryString(filter, searchInput)
    updateUrlAndFetchMembers(queryString, setRecipes, fetchRecipes)
  }

  useEffect(() => {
    const { ingredients, title } = params
    if (title && title.length > 0) {
      setFilter('요리명')
      setSearchInput(title)
    } else if (ingredients && ingredients.length > 0) {
      setSearchInput(ingredients)
    }
  }, [params])

  return (
    <div className="md:p-4 bg-gray-100">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSearchSubmit()
        }}
      >
        <AdminFilter
          title="레시피"
          filterList={['요리명', '재료']}
          setFilter={setFilter}
          filter={filter}
          redirectUrl="recipes"
          isWrite
        >
          <AdminInput
            placeholder="레시피 정보 입력"
            state={searchInput}
            setState={setSearchInput}
          />
        </AdminFilter>
      </form>
      <RecipeList recipes={recipes} lastElementRef={lastElementRef} />
    </div>
  )
}

export default AdminRecipe
