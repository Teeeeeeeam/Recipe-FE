'use client'

import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { useState, useEffect } from 'react'
import useNotice from './use-notice'
import NoticeFilter from './notice-filter'
import NoticeList from './notice-list'
import { buildQueryString, updateUrlAndFetchNotices } from './url-utils'

const Notice = ({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) => {
  const [searchInput, setSearchInput] = useState('')
  const { notices, setNotices, fetchNotice, hasMore } = useNotice(searchParams)

  const lastElementRef = useInfiniteScroll(fetchNotice, hasMore)

  useEffect(() => {
    const { title } = searchParams

    if (title) {
      setSearchInput(title)
    }
  }, [searchParams])

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
