import { Dispatch, SetStateAction, useState } from 'react'

import AdminInput from '@/components/common/admin-input'
import Link from 'next/link'

interface MemberFilterProps {
  searchInput: string
  setSearchInput: Dispatch<SetStateAction<string>>
  //   handleSearchSubmit: () => void
}

const NoticeFilter = ({ searchInput, setSearchInput }: MemberFilterProps) => {
  return (
    <div className="grid grid-cols-[1fr_4fr_1fr_1fr] w-full items-center text-center gap-x-2 mb-2">
      <button
        type="button"
        className="flex justify-center items-center bg-green-150 h-full rounded-sm"
        onClick={() => (window.location.href = '/admin/notice')}
      >
        공지사항 목록
      </button>
      <AdminInput
        placeholder="공지사항 검색"
        state={searchInput}
        setState={setSearchInput}
      />
      <button
        className="bg-green-100 h-full rounded-sm hover:bg-green-150"
        type="submit"
      >
        검색
      </button>
      <Link
        href="/admin/notice/write"
        className="flex items-center justify-center h-full bg-green-100 hover:bg-green-150 rounded-sm"
      >
        <button type="button">공지사항 등록</button>
      </Link>
    </div>
  )
}

export default NoticeFilter
