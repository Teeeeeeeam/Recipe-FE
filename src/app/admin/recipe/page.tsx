'use client'

import { getRecipe } from '@/api/admin-apis'
import AdminInput from '@/components/common/admin-input'
import useInfiniteScroll from '@/components/use-infinite-scroll'
import { RecipeDtoList } from '@/types/admin'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'

const AdminRecipe = ({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) => {
  const [recipes, setRecipes] = useState<RecipeDtoList[]>([])
  const [lastId, setLastId] = useState<number | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [searchInput, setSearchInput] = useState('')
  const [filter, setFilter] = useState('재료')
  const [isFilter, setIsFilter] = useState(false)

  const { ingredients, title } = searchParams

  const loadMore = useCallback(async () => {
    if (!hasMore) return
    try {
      if (
        (title === undefined || title === '') &&
        (ingredients === undefined || ingredients === '')
      ) {
        const res = await getRecipe(lastId, null, null)
        const newRecipes = res.recipeDtoList
        setLastId(newRecipes[newRecipes.length - 1].id)
        setRecipes((prev) => [...prev, ...newRecipes])
        setHasMore(res.nextPage)
      } else {
        const res =
          ingredients !== undefined
            ? await getRecipe(lastId, ingredients, null)
            : await getRecipe(lastId, null, title)
        const newRecipes = res.recipeDtoList
        setLastId(newRecipes[newRecipes.length - 1].id)
        setRecipes((prev) => [...prev, ...newRecipes])
        setHasMore(res.nextPage)
      }
    } catch (error) {
      console.log(error)
    }
  }, [lastId, hasMore, searchParams])

  const lastElementRef = useInfiniteScroll(loadMore, hasMore)
  const handleSearchSubmit = () => {
    const query =
      filter === '재료' ? ['ingredients', searchInput] : ['title', searchInput]
    const queryString = new URLSearchParams([query]).toString()
    const newUrl = `/admin/recipe?${queryString}`
    window.location.href = newUrl
    setRecipes([])
    loadMore()
  }

  useEffect(() => {
    if (title && title.length > 0) {
      setFilter('요리명')
      setSearchInput(title)
    } else if (ingredients && ingredients.length > 0) {
      setSearchInput(ingredients)
    }
  }, [])
  return (
    <div>
      <form
        className="grid grid-cols-[1fr_4fr_1fr_1fr] w-full items-center text-center gap-x-2 mb-2"
        onSubmit={(e) => {
          console.log('제출')
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
            className="relative flex justify-center gap-x-2 cursor-pointer bg-white h-full border-r"
            onClick={() => setIsFilter(!isFilter)}
          >
            <button type="button">{filter}</button>
            <Image
              src="/svg/down-arrow.svg"
              alt="down-arrow"
              width={16}
              height={16}
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
      </form>
      <div className="bg-navy-50 p-2 text-white rounded-md">
        <ul className="grid grid-cols-[1fr_2fr_3fr_2fr_1fr_2fr_2fr_2fr] text-[12px] lg:text-[16px] text-center bg-navy-100 py-4 rounded-t-md ">
          <li>체크</li>
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
                className="grid grid-cols-[1fr_2fr_3fr_2fr_1fr_2fr_2fr_2fr] text-[12px] lg:text-[16px] text-center py-4 bg-navy-100"
              >
                <li>체크</li>
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
                  <span>수정</span>
                  <span>/</span>
                  <span>삭제</span>
                </li>
              </ul>
            ))}

          <div ref={lastElementRef}></div>
        </div>
      </div>
    </div>
  )
}

export default AdminRecipe

{
  /* <Link
href={{
  pathname: '/admin/recipe',
  query:
    filter === '재료'
      ? { ingredients: searchInput }
      : { title: searchInput },
}}
> */
}