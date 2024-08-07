'use client'
import { Dispatch, SetStateAction, useState } from 'react'

import AdminInput from '@/components/common/admin-input'
import { useRouter } from 'next/navigation'

interface MemberFilterProps {
  searchInput: string
  setSearchInput: Dispatch<SetStateAction<string>>
  isAdmin?: boolean
}

const NoticeFilter = ({
  searchInput,
  setSearchInput,
  isAdmin = false,
}: MemberFilterProps) => {
  const router = useRouter()
  return (
    <div className="bg-white p-4 rounded shadow">
      <h1 className="text-xl font-semibold mb-2">공지사항</h1>
      <div
        className={`flex flex-col md:grid ${isAdmin ? 'md:grid-cols-[1fr_4fr_1fr_1fr]' : 'md:grid-cols-[1fr_4fr_1fr]'} items-center w-full gap-2`}
      >
        <button
          type="button"
          className="flex justify-center items-center h-10 w-full md:w-auto px-4 rounded-sm text-white bg-blue-100 hover:bg-blue-150"
          onClick={() =>
            (window.location.href = isAdmin ? '/admin/notices' : '/notices')
          }
        >
          목록
        </button>
        <AdminInput
          placeholder="공지사항 검색 (2글자 이상)"
          state={searchInput}
          setState={setSearchInput}
          isBorder
        />
        <button
          className="h-10 w-full md:w-auto px-4 rounded-sm text-white bg-blue-100 hover:bg-blue-150"
          type="submit"
        >
          검색
        </button>
        {isAdmin && (
          <button
            type="button"
            className="h-10 w-full md:w-auto px-4 rounded-sm text-white bg-blue-100 hover:bg-blue-150"
            onClick={() => router.push('/admin/notices/write')}
          >
            등록
          </button>
        )}
      </div>
    </div>
  )
}

export default NoticeFilter
