import { Dispatch, SetStateAction, useState } from 'react'
import Image from 'next/image'
import AdminInput from '@/components/common/admin-input'

const FILTER_LIST = ['아이디', '이름', '이메일', '닉네임']

interface MemberFilterProps {
  searchInput: string
  setSearchInput: Dispatch<SetStateAction<string>>
  setFilter: Dispatch<SetStateAction<string>>
  filter: string
  handleSearchSubmit: () => void
}

const MemberFilter = ({
  searchInput,
  setSearchInput,
  setFilter,
  filter,
  handleSearchSubmit,
}: MemberFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <div className="grid grid-cols-[1fr_5fr_1fr] w-full items-center text-center gap-x-2 mb-2">
      <button
        type="button"
        className="flex justify-center items-center text-white bg-blue-100 hover:bg-blue-150 h-full rounded-sm"
        onClick={() => (window.location.href = '/admin/members')}
      >
        사용자 목록
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
            <ul className="absolute top-full bg-white w-full z-30">
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
          placeholder="사용자 검색"
          state={searchInput}
          setState={setSearchInput}
        />
      </div>
      <button
        className="text-white bg-blue-100 h-full rounded-sm hover:bg-blue-150"
        type="button"
        onClick={handleSearchSubmit}
      >
        검색
      </button>
    </div>
  )
}

export default MemberFilter
