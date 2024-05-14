'use client'

import { getRecipe } from '@/api/admin-apis'
import AdminInput from '@/components/common/admin-input'
import useInfiniteScroll from '@/components/use-infinite-scroll'
import { RecipeDtoList } from '@/types/admin'
import { useState } from 'react'

const AdminRecipe = () => {
  const [recipes, setRecipes] = useState<RecipeDtoList[]>([])
  const [lastId, setLastId] = useState<number | null>(null)
  const [hasMore, setHasMore] = useState(true)

  const loadMore = async () => {
    if (!hasMore) return
    try {
      const res = await getRecipe('', lastId)

      const newRecipes = res.recipeDtoList
      setLastId(newRecipes[newRecipes.length - 1].id)
      setRecipes((prev) => [...prev, ...newRecipes])
      setHasMore(res.nextPage)
    } catch (error) {
      console.log(error)
    }
  }
  const lastElementRef = useInfiniteScroll(loadMore, hasMore)

  return (
    <div>
      <div className="grid grid-cols-[1fr_3fr_1fr] w-full items-center text-center gap-x-2 mb-2">
        <div>레시피 목록</div>
        <div>
          <AdminInput placeholder="레시피 정보 입력" />
        </div>
        <div>검색</div>
      </div>
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
                <li>{el.title}</li>
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
