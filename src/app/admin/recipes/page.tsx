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
    <div>
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
      {/* <form
        className="grid grid-cols-[1fr_4fr_1fr_1fr] w-full items-center text-center gap-x-2 mb-2"
        onSubmit={(e) => {
          e.preventDefault()
          handleSearchSubmit()
        }}
      >
        <button
          type="button"
          className="flex justify-center items-center bg-green-150 h-full rounded-sm"
          onClick={() => (window.location.href = '/admin/recipe')}
        >
          레시피 목록
        </button>
        <div className="grid grid-cols-[2fr_7fr] items-center border">
          <div
            className="relative flex justify-center items-center gap-x-2 cursor-pointer bg-white h-full border-r"
            onClick={() => setIsFilter(!isFilter)}
          >
            <button type="button">{filter}</button>
            <Image
              src="/svg/down-arrow.svg"
              alt="down-arrow"
              width={0}
              height={0}
              className="w-4 h-4"
              priority
            />
            {isFilter && (
              <ul className="absolute top-[100%] bg-white w-full z-30">
                <li
                  onClick={() => {
                    setFilter('재료')
                    setIsFilter(false)
                  }}
                  className="hover:bg-gray-50 border-t"
                >
                  재료
                </li>
                <li
                  onClick={() => {
                    setFilter('요리명')
                    setIsFilter(false)
                  }}
                  className="hover:bg-gray-50 border-t"
                >
                  요리명
                </li>
              </ul>
            )}
          </div>
          <AdminInput
            placeholder="레시피 정보 입력"
            state={searchInput}
            setState={setSearchInput}
          />
        </div>
        <button
          className="bg-green-100 h-full rounded-sm hover:bg-green-150"
          type="submit"
        >
          검색
        </button>
        <Link
          href="/admin/recipe/write"
          className="flex items-center justify-center h-full bg-green-100 hover:bg-green-150 rounded-sm"
        >
          <button type="button">레시피 등록</button>
        </Link>
      </form> */}
      <RecipeList recipes={recipes} lastElementRef={lastElementRef} />
      {/* <div className="bg-navy-50 p-2 text-white rounded-md">
        <ul className="grid grid-cols-[1fr_2fr_3fr_2fr_1fr_2fr_2fr_2fr] text-[12px] lg:text-[16px] text-center bg-navy-100 py-4 rounded-t-md ">
          <li className="flex justify-center items-center">
            <div className="relative">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="cursor-pointer w-5 h-5"
              />
              <Image
                src={`/svg/trash.svg`}
                alt="delete-icon"
                width={40}
                height={40}
                className="absolute top-0 left-[25px] cursor-pointer translate-transition hover:scale-x-110"
                onClick={handleAllDeleteClick}
                priority
              />
            </div>
          </li>
          <li>레시피 번호</li>
          <li>요리명</li>
          <li>주재료</li>
          <li>인분</li>
          <li>요리시간</li>
          <li>등록일자</li>
          <li>관리</li>
        </ul>
        <div className="flex flex-col space-y-2 mt-2">
          {recipes &&
            recipes.map((el) => (
              <ul
                key={el.id}
                className="grid grid-cols-[1fr_2fr_3fr_2fr_1fr_2fr_2fr_2fr] items-center text-[12px] lg:text-[16px] text-center py-4 bg-navy-100"
              >
                <li className="flex justify-center items-center">
                  <input
                    type="checkbox"
                    checked={deleteList.includes(el.id)}
                    onChange={() => handleCheckboxChange(el.id)}
                    className="w-5 h-5 cursor-pointer"
                  />
                </li>
                <li>{el.id}</li>
                <Link href={`/list-page/main-recipes/${el.id}`}>
                  <li className="cursor-pointer hover:text-green-150">
                    {el.title}
                  </li>
                </Link>
                <li>요리명</li>
                <li>{el.people}</li>
                <li>{el.cookingTime}</li>
                <li>등록일자</li>
                <li className="space-x-1">
                  <Link href={`/admin/recipe/modify/${el.id}`}>
                    <button className="hover:text-green-150">수정</button>
                  </Link>
                  <span>/</span>
                  <button onClick={() => handleDeleteRecipeClick(el.id)}>
                    삭제
                  </button>
                </li>
              </ul>
            ))}

          <div ref={lastElementRef}></div>
        </div>
      </div> */}
    </div>
  )
}

export default AdminRecipe
