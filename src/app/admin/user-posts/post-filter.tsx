import { useState, Dispatch, SetStateAction, FormEvent } from 'react'
import AdminInput from '@/components/common/admin-input'
import Image from 'next/image'

const FILTER_LIST = ['요리글 제목', '레시피 제목', '아이디']

interface PostFilterProps {
  searchInput: string
  setSearchInput: Dispatch<SetStateAction<string>>
  setFilter: Dispatch<SetStateAction<string>>
  filter: string
  handleSearchSubmit: () => void
}

const PostFilter: React.FC<PostFilterProps> = ({
  searchInput,
  setSearchInput,
  setFilter,
  filter,
  handleSearchSubmit,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <div className="grid grid-cols-[1fr_4fr_1fr] w-full items-center text-center gap-x-2 mb-2">
      <button
        type="button"
        className="flex justify-center items-center bg-green-150 h-full rounded-sm"
        onClick={() => (window.location.href = '/admin/user-posts')}
      >
        요리글 목록
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
              {FILTER_LIST.map((el) => (
                <li
                  key={el}
                  onClick={() => {
                    setFilter(el)
                    setIsFilterOpen(false)
                  }}
                  className="hover:bg-gray-50 border-t"
                >
                  {el}
                </li>
              ))}
            </ul>
          )}
        </div>
        <AdminInput
          placeholder="요리글 정보 입력"
          state={searchInput}
          setState={setSearchInput}
        />
      </div>
      <button
        className="bg-green-100 h-full rounded-sm hover:bg-green-150"
        type="button"
        onClick={handleSearchSubmit}
      >
        검색
      </button>
    </div>
  )
}

export default PostFilter
