import { useState, Dispatch, SetStateAction, FormEvent } from 'react'
import AdminInput from '@/components/common/admin-input'
import Image from 'next/image'

const FILTER_LIST = ['요리글 제목', '레시피 제목', '아이디']

interface PostFilterProps {
  searchInput: string
  setSearchInput: Dispatch<SetStateAction<string>>
  setFilter: Dispatch<SetStateAction<string>>
  filter: string
}

const PostFilter: React.FC<PostFilterProps> = ({
  searchInput,
  setSearchInput,
  setFilter,
  filter,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <div className="flex flex-col md:grid md:grid-cols-[1fr_4fr_1fr] items-center w-full gap-2 mb-2">
      <button
        type="button"
        className="flex justify-center items-center h-10 w-full md:w-auto px-4 rounded-sm text-white bg-blue-100 hover:bg-blue-150"
        onClick={() => (window.location.href = '/admin/user-posts')}
      >
        요리글 목록
      </button>
      <div className="flex flex-col md:grid md:grid-cols-[2fr_7fr] items-center w-full md:w-auto border rounded">
        <div
          className="relative flex justify-center items-center gap-x-2 cursor-pointer bg-white h-10 text-[14px] border-b md:border-b-0 md:border-r w-full md:w-auto"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <button type="button" className="px-2">
            {filter}
          </button>
          <Image
            src="/svg/down-arrow.svg"
            alt="down-arrow"
            width={16}
            height={16}
            className="w-4 h-4"
            priority
          />
          {isFilterOpen && (
            <ul className="absolute top-full left-0 bg-white w-full z-30 border rounded shadow-lg">
              {FILTER_LIST.map((el) => (
                <li
                  key={el}
                  onClick={() => {
                    setFilter(el)
                    setIsFilterOpen(false)
                  }}
                  className="hover:bg-gray-50 px-4 py-2 cursor-pointer"
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
        className="h-10 w-full md:w-auto px-4 rounded-sm text-white bg-blue-100 hover:bg-blue-150"
        type="submit"
      >
        검색
      </button>
    </div>
  )
}

export default PostFilter
