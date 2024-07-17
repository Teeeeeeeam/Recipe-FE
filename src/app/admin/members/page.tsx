'use client'

import { useState, useEffect } from 'react'
import useMembers from './use-members'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import MemberList from './member-list'
import { buildQueryString, updateUrlAndFetchMembers } from './url-utils'
import AdminFilter from '@/components/layout/admin/admin-filter'
import AdminInput from '@/components/common/admin-input'
import { useSearchParams } from 'next/navigation'
import { AdminListSkeletonLoader } from '@/components/layout/skeleton/admin-skeleton'
import NoResult from '@/components/layout/no-result'

const Members = () => {
  const [searchInput, setSearchInput] = useState('')
  const [filter, setFilter] = useState('아이디')

  const searchParams = useSearchParams()
  const params = Object.fromEntries(searchParams.entries())
  const { loginId, username, email, nickname } = params
  const { members, fetchMembers, hasMore, loading, initialLoading } =
    useMembers(params)
  const lastElementRef = useInfiniteScroll(fetchMembers, hasMore)

  useEffect(() => {
    if (!!loginId) {
      setFilter('아이디')
      setSearchInput(loginId)
    } else if (!!username) {
      setFilter('이름')
      setSearchInput(username)
    } else if (!!email) {
      setFilter('이메일')
      setSearchInput(email)
    } else if (!!nickname) {
      setFilter('닉네임')
      setSearchInput(nickname)
    }
  }, [loginId, username, email, nickname])

  const handleSearchSubmit = () => {
    if (searchInput.length === 0) return
    if (searchInput.length === 1) {
      alert('검색은 2글자 이상만 가능합니다')
      return
    }
    const queryString = buildQueryString(filter, searchInput)
    updateUrlAndFetchMembers(queryString)
  }

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
            placeholder="사용자 검색 (2글자 이상)"
            state={searchInput}
            setState={setSearchInput}
          />
        </AdminFilter>
      </form>
      {initialLoading ? (
        <AdminListSkeletonLoader />
      ) : members.length === 0 ? (
        <NoResult />
      ) : (
        <MemberList
          members={members}
          lastElementRef={lastElementRef}
          loading={loading}
        />
      )}
    </div>
  )
}

export default Members
