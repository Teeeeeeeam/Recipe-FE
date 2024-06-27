'use client'

import { useState, useEffect } from 'react'
import useMembers from './use-members'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import MemberFilter from './member-filter'
import MemberList from './member-list'
import { buildQueryString, updateUrlAndFetchMembers } from './url-utils'

const Members = ({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) => {
  const [searchInput, setSearchInput] = useState('')
  const [filter, setFilter] = useState('아이디')
  const { members, setMembers, fetchMembers, hasMore } =
    useMembers(searchParams)
  const lastElementRef = useInfiniteScroll(fetchMembers, hasMore)

  useEffect(() => {
    const { loginId, username, email, nickname } = searchParams

    if (loginId && loginId.length > 0) {
      setFilter('아이디')
      setSearchInput(loginId)
    } else if (username && username.length > 0) {
      setFilter('이름')
      setSearchInput(username)
    } else if (email && email.length > 0) {
      setFilter('이메일')
      setSearchInput(email)
    } else if (nickname && nickname.length > 0) {
      setFilter('닉네임')
      setSearchInput(nickname)
    }
  }, [searchParams])

  const handleSearchSubmit = () => {
    const queryString = buildQueryString(filter, searchInput)
    updateUrlAndFetchMembers(queryString, setMembers, fetchMembers)
  }
  if (!members) return null
  return (
    <div className="md:p-4 bg-gray-100">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSearchSubmit()
        }}
      >
        <MemberFilter
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setFilter={setFilter}
          filter={filter}
          handleSearchSubmit={handleSearchSubmit}
        />
      </form>
      <MemberList members={members} lastElementRef={lastElementRef} />
    </div>
  )
}

export default Members
