import AdminInput from '@/components/common/admin-input'
import Image from 'next/image'
import Link from 'next/link'
import { Dispatch, SetStateAction, useState } from 'react'

interface RecipeFilterProps {
  searchInput: string
  setSearchInput: Dispatch<SetStateAction<string>>
  setFilter: Dispatch<SetStateAction<string>>
  filter: string
}

const RecipeFilter = ({
  searchInput,
  setSearchInput,
  setFilter,
  filter,
}: RecipeFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <div className="grid grid-cols-[1fr_4fr_1fr_1fr] w-full items-center text-center gap-x-2 mb-2">
      <button
        type="button"
        className="flex justify-center items-center bg-green-150 h-full rounded-sm"
        onClick={() => (window.location.href = '/admin/recipes')}
      >
        레시피 목록
      </button>
      <div className="grid grid-cols-[2fr_7fr] items-center border">
        <div
          className="relative flex justify-center items-center gap-x-2 cursor-pointer bg-white h-full border-r"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
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
          {isFilterOpen && (
            <ul className="absolute top-[100%] bg-white w-full z-30">
              <li
                onClick={() => {
                  setFilter('재료')
                  setIsFilterOpen(false)
                }}
                className="hover:bg-gray-50 border-t"
              >
                재료
              </li>
              <li
                onClick={() => {
                  setFilter('요리명')
                  setIsFilterOpen(false)
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
        href="/admin/recipes/write"
        className="flex items-center justify-center h-full bg-green-100 hover:bg-green-150 rounded-sm"
      >
        <button type="button">레시피 등록</button>
      </Link>
    </div>
  )
}

export default RecipeFilter
