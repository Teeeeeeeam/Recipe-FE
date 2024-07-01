'use client'
import { useState, Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface AdminFilterProps {
  children: React.ReactNode
  title: string
  filterList: string[]
  filter: string
  setFilter: Dispatch<SetStateAction<string>>
  redirectUrl: string
  isWrite?: boolean
}

const AdminFilter = ({
  children,
  title,
  filterList,
  filter,
  setFilter,
  redirectUrl,
  isWrite = false,
}: AdminFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const router = useRouter()
  return (
    <div className="bg-white p-4 rounded shadow">
      <h1 className="text-xl font-semibold mb-2">{title}</h1>
      <div
        className={`flex flex-col md:grid ${isWrite ? 'md:grid-cols-[0.5fr_4fr_1fr_1fr]' : 'md:grid-cols-[0.5fr_4fr_1fr]'} items-center w-full gap-2`}
      >
        <button
          type="button"
          className="flex justify-center items-center h-10 w-full md:w-auto rounded-sm text-white bg-blue-100 hover:bg-blue-150"
          onClick={() => (window.location.href = `/admin/${redirectUrl}`)}
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
              width={16}
              height={16}
              className="w-4 h-4"
              priority
            />
            {isFilterOpen && (
              <ul className="absolute top-full left-0 bg-white w-full z-30 border rounded shadow-lg">
                {filterList.map((el) => (
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
          {children}
        </div>
        <button
          className="h-10 w-full md:w-auto px-4 rounded-sm text-white bg-blue-100 hover:bg-blue-150"
          type="submit"
        >
          검색
        </button>
        {isWrite && (
          <button
            type="button"
            className="h-10 w-full md:w-auto px-4 rounded-sm text-white bg-blue-100 hover:bg-blue-150"
            onClick={() => router.push(`/admin/${redirectUrl}/write`)}
          >
            등록
          </button>
        )}
      </div>
    </div>
  )
}

export default AdminFilter
