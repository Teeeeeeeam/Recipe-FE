'use client'

import { useState, useEffect } from 'react'
import usePosts from './use-posts'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import PostList from './post-list'
import { buildQueryString, updateUrlAndFetchPosts } from './url-utils'
import AdminFilter from '@/components/layout/admin/admin-filter'
import AdminInput from '@/components/common/admin-input'
import { useSearchParams } from 'next/navigation'
import { AdminListSkeletonLoader } from '@/components/layout/skeleton/admin-skeleton'
import NoResult from '@/components/layout/no-result'

const UserPosts = () => {
  const [searchInput, setSearchInput] = useState('')
  const [filter, setFilter] = useState('요리글 제목')

  const [activeCommentId, setActiveCommentId] = useState<number | null>(null)

  const searchParams = useSearchParams()
  const params = Object.fromEntries(searchParams.entries())
  const { id, recipeTitle, postTitle } = params

  const { posts, fetchPosts, hasMore, loading, initialLoading } =
    usePosts(params)

  const handleSearchSubmit = () => {
    if (searchInput.length === 0) return
    if (searchInput.length === 1) {
      alert('검색은 2글자 이상만 가능합니다')
      return
    }
    const queryString = buildQueryString(filter, searchInput)
    updateUrlAndFetchPosts(queryString)
  }

  useEffect(() => {
    if (!!id) {
      setFilter('아이디')
      setSearchInput(id)
    } else if (!!recipeTitle) {
      setFilter('레시피 제목')
      setSearchInput(recipeTitle)
    } else if (!!postTitle) {
      setFilter('요리글 제목')
      setSearchInput(postTitle)
    }
  }, [id, recipeTitle, postTitle])
  const lastElementRef = useInfiniteScroll(fetchPosts, hasMore)
  const handleGetCommentClick = (id: number) => {
    setActiveCommentId((prev) => (prev === id ? null : id))
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
          title="유저 게시글"
          filterList={['요리글 제목', '레시피 제목', '아이디']}
          filter={filter}
          setFilter={setFilter}
          redirectUrl="user-posts"
        >
          <AdminInput
            placeholder="요리글 정보 입력 (2글자 이상)"
            state={searchInput}
            setState={setSearchInput}
          />
        </AdminFilter>
      </form>
      {initialLoading ? (
        <AdminListSkeletonLoader />
      ) : posts.length === 0 ? (
        <NoResult />
      ) : (
        <PostList
          posts={posts}
          lastElementRef={lastElementRef}
          activeCommentId={activeCommentId}
          loading={loading}
          handleGetCommentClick={handleGetCommentClick}
        />
      )}
    </div>
  )
}

export default UserPosts
