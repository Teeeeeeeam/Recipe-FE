'use client'

import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { useState } from 'react'
import useNotice from './use-notice'
import NoticeFilter from './notice-filter'
import NoticeList from './notice-list'

const Notice = ({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) => {
  const [searchInput, setSearchInput] = useState('')
  const { notices, setNotices, fetchNotice, hasMore } = useNotice()

  const lastElementRef = useInfiniteScroll(fetchNotice, hasMore)

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <NoticeFilter
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </form>
      <NoticeList notices={notices} lastElementRef={lastElementRef} />
    </>
  )
}

export default Notice
