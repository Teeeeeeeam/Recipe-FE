'use client'

import { getNotice } from '@/api/admin-apis'
import AdminInput from '@/components/common/admin-input'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { NoticeInfo } from '@/types/admin'
import Link from 'next/link'
import { useState, useCallback } from 'react'

const Notice = () => {
  const [searchInput, setSearchInput] = useState('')
  const [notices, setNotices] = useState<NoticeInfo[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [lastId, setLastId] = useState<number | null>(null)

  const fetchGetNotice = useCallback(async () => {
    if (!hasMore) return
    try {
      const res = await getNotice(lastId)
      const newNotices = res.notice
      setNotices((prev) => [...prev, ...newNotices])
      setHasMore(res.nextPage)
    } catch (err) {
      console.log(err)
    }
  }, [hasMore, lastId])

  const lastElementRef = useInfiniteScroll(fetchGetNotice, hasMore)

  return (
    <div>
      <form
        className="grid grid-cols-[1fr_4fr_1fr_1fr] w-full items-center text-center gap-x-2 mb-2"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
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
      </form>
      <div className="bg-navy-50 p-2 text-white rounded-md">
        <ul className="grid grid-cols-[1fr_1fr_3fr_2fr_2fr_2fr] text-[12px] lg:text-[16px] text-center bg-navy-100 py-4 rounded-t-md ">
          <li>체크</li>
          <li>공지사항 번호</li>
          <li>제목</li>
          <li>글쓴이</li>
          <li>등록일자</li>
          <li>관리</li>
        </ul>
        <div className="flex flex-col space-y-2 mt-2">
          {notices &&
            notices.map((el) => (
              <ul
                key={el.id}
                className="grid grid-cols-[1fr_1fr_3fr_2fr_2fr_2fr] text-[12px] lg:text-[16px] text-center bg-navy-100 py-4"
              >
                <li>체크</li>
                <li>{el.id}</li>
                <li>{el.noticeTitle}</li>
                <li>{el.member.nickname}</li>
                <li>{el.created_at.slice(0, 10)}</li>
                <li>관리</li>
              </ul>
            ))}
          <div ref={lastElementRef}></div>
        </div>
      </div>
    </div>
  )
}

export default Notice
