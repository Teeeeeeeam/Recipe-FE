'use client'

import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { useState, useEffect } from 'react'
import useRecipes from './use-recipes'
import RecipeList from './recipe-list'
import { buildQueryString, updateUrlAndFetchMembers } from './url-utils'
import AdminFilter from '@/components/layout/admin/admin-filter'
import AdminInput from '@/components/common/admin-input'
import { useSearchParams } from 'next/navigation'
import { AdminListSkeletonLoader } from '@/components/layout/skeleton/admin-skeleton'
import NoResult from '@/components/layout/no-result'

const AdminRecipe = () => {
  const [searchInput, setSearchInput] = useState('')
  const [filter, setFilter] = useState('요리명')

  const searchParams = useSearchParams()
  const params = Object.fromEntries(searchParams.entries())

  const { recipes, fetchRecipes, hasMore, loading, initialLoading } =
    useRecipes(params)
  const lastElementRef = useInfiniteScroll(fetchRecipes, hasMore)
  const handleSearchSubmit = () => {
    if (searchInput.length === 0) return
    if (searchInput.length === 1) {
      alert('검색은 2글자 이상만 가능합니다')
      return
    }
    const queryString = buildQueryString(filter, searchInput)
    updateUrlAndFetchMembers(queryString)
  }

  const { ingredients, title } = params
  useEffect(() => {
    if (!!title) {
      setFilter('요리명')
      setSearchInput(title)
    } else if (!!ingredients) {
      setSearchInput(ingredients)
    }
  }, [ingredients, title])

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
            placeholder="레시피 정보 입력 (2글자 이상)"
            state={searchInput}
            setState={setSearchInput}
          />
        </AdminFilter>
      </form>
      {initialLoading ? (
        <AdminListSkeletonLoader />
      ) : recipes.length === 0 ? (
        <NoResult />
      ) : (
        <RecipeList
          recipes={recipes}
          loading={loading}
          lastElementRef={lastElementRef}
        />
      )}
    </div>
  )
}

export default AdminRecipe
