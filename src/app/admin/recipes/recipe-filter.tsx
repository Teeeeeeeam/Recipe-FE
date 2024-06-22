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
    <div className="flex flex-col md:grid md:grid-cols-[1fr_4fr_1fr_1fr] w-full items-center text-center gap-2 mb-2">
      <button
        type="button"
        className="flex justify-center items-center h-10 w-full md:w-auto px-4 rounded-sm text-white bg-blue-100 hover:bg-blue-150"
        onClick={() => (window.location.href = '/admin/recipes')}
      >
        목록
      </button>
      <div className="flex flex-col md:grid md:grid-cols-[2fr_7fr] items-center w-full md:w-auto border rounded">
        <div
          className="relative flex justify-center items-center gap-x-2 cursor-pointer bg-white h-10 text-[14px] border-b md:border-b-0 md:border-r w-full md:w-auto"
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
            <ul className="absolute top-full left-0 bg-white w-full z-30 border rounded shadow-lg">
              <li
                onClick={() => {
                  setFilter('재료')
                  setIsFilterOpen(false)
                }}
                className="hover:bg-gray-50 px-4 py-2 cursor-pointer"
              >
                재료
              </li>
              <li
                onClick={() => {
                  setFilter('요리명')
                  setIsFilterOpen(false)
                }}
                className="hover:bg-gray-50 px-4 py-2 cursor-pointer"
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
        className="h-10 w-full md:w-auto px-4 rounded-sm text-white bg-blue-100 hover:bg-blue-150"
        type="submit"
      >
        검색
      </button>

      <button
        type="button"
        className="h-10 w-full md:w-auto px-4 rounded-sm text-white bg-blue-100 hover:bg-blue-150"
      >
        <Link href="/admin/recipes/write">등록</Link>
      </button>
    </div>
  )
}

export default RecipeFilter
