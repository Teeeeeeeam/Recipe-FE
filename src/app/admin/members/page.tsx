'use client'

import { useState, useEffect } from 'react'
import useMembers from './use-members'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import MemberList from './member-list'
import { buildQueryString, updateUrlAndFetchMembers } from './url-utils'
import AdminFilter from '@/components/layout/admin-filter'
import AdminInput from '@/components/common/admin-input'
import { useSearchParams } from 'next/navigation'

const Members = () => {
  const [searchInput, setSearchInput] = useState('')
  const [filter, setFilter] = useState('아이디')

  const searchParams = useSearchParams()
  const params = Object.fromEntries(searchParams.entries())

  const { members, setMembers, fetchMembers, hasMore } = useMembers(params)
  const lastElementRef = useInfiniteScroll(fetchMembers, hasMore)
  console.log(members)
  useEffect(() => {
    const { loginId, username, email, nickname } = params

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
  }, [params])

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
        <AdminFilter
          title="사용자"
          filterList={['아이디', '이름', '이메일', '닉네임']}
          setFilter={setFilter}
          filter={filter}
          redirectUrl="members"
        >
          <AdminInput
            placeholder="사용자 검색"
            state={searchInput}
            setState={setSearchInput}
          />
        </AdminFilter>
      </form>
      <MemberList members={members} lastElementRef={lastElementRef} />
    </div>
  )
}

export default Members
