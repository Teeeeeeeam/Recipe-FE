'use client'

import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { useState, useEffect } from 'react'
import useNotice from '../admin/notices/use-notice'

import {
  buildQueryString,
  updateUrlAndFetchNotices,
} from '../admin/notices/url-utils'
import { useSearchParams } from 'next/navigation'
import NoticeList from '@/components/layout/notice/notice-list'
import NoticeFilter from '@/components/layout/notice/notice-filter'
import { AdminListSkeletonLoader } from '@/components/layout/skeleton/admin-skeleton'
import NoResult from '@/components/layout/no-result'

const Notice = () => {
  const [searchInput, setSearchInput] = useState('')

  const searchParams = useSearchParams()
  const params = Object.fromEntries(searchParams.entries())

  const { notices, fetchNotice, hasMore, loading, initialLoading } =
    useNotice(params)
  const lastElementRef = useInfiniteScroll(fetchNotice, hasMore)

  const { title } = params
  useEffect(() => {
    if (title) {
      setSearchInput(title)
    }
  }, [title])

  const handleSearchSubmit = () => {
    const queryString = buildQueryString(searchInput)
    updateUrlAndFetchNotices(queryString, false)
  }

  return (
    <div className="md:p-4 bg-gray-100">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSearchSubmit()
        }}
      >
        <NoticeFilter
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </form>
      {initialLoading ? (
        <AdminListSkeletonLoader />
      ) : notices.length === 0 ? (
        <NoResult />
      ) : (
        <NoticeList
          notices={notices}
          lastElementRef={lastElementRef}
          loading={loading}
        />
      )}
    </div>
  )
}

export default Notice
