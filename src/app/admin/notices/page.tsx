'use client'

import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { useState, useEffect } from 'react'
import useNotice from './use-notice'

import { buildQueryString, updateUrlAndFetchNotices } from './url-utils'
import { useSearchParams } from 'next/navigation'
import NoticeList from '@/components/layout/notice/notice-list'
import NoticeFilter from '@/components/layout/notice/notice-filter'

const Notice = () => {
  const [searchInput, setSearchInput] = useState('')

  const searchParams = useSearchParams()
  const params = Object.fromEntries(searchParams.entries())

  const { notices, setNotices, fetchNotice, hasMore } = useNotice(params)
  const lastElementRef = useInfiniteScroll(fetchNotice, hasMore)

  useEffect(() => {
    const { title } = params

    if (title) {
      setSearchInput(title)
    }
  }, [params])

  const handleSearchSubmit = () => {
    const queryString = buildQueryString(searchInput)
    updateUrlAndFetchNotices(queryString, setNotices, fetchNotice, true)
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
          isAdmin
        />
      </form>
      <NoticeList notices={notices} lastElementRef={lastElementRef} isAdmin />
    </div>
  )
}

export default Notice
