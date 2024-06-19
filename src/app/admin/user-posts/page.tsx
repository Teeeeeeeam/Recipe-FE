'use client'

import { useState, useEffect } from 'react'
import usePosts from './use-posts'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import PostFilter from './post-filter'
import PostList from './post-list'
import { buildQueryString, updateUrlAndFetchPosts } from './url-utils'

const UserPosts = ({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) => {
  const [searchInput, setSearchInput] = useState('')
  const [filter, setFilter] = useState('요리글 제목')
  const { posts, setPosts, fetchPosts, hasMore } = usePosts(searchParams)
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null)
  const lastElementRef = useInfiniteScroll(fetchPosts, hasMore)

  useEffect(() => {
    const { id, recipeTitle, postTitle } = searchParams

    if (id) {
      setFilter('아이디')
      setSearchInput(id)
    } else if (recipeTitle) {
      setFilter('레시피 제목')
      setSearchInput(recipeTitle)
    } else if (postTitle) {
      setFilter('요리글 제목')
      setSearchInput(postTitle)
    }
  }, [searchParams])

  const handleSearchSubmit = () => {
    const queryString = buildQueryString(filter, searchInput)
    updateUrlAndFetchPosts(queryString, setPosts, fetchPosts)
  }

  const handleGetCommentClick = (id: number) => {
    setActiveCommentId((prev) => (prev === id ? null : id))
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSearchSubmit()
        }}
      >
        <PostFilter
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setFilter={setFilter}
          filter={filter}
          handleSearchSubmit={handleSearchSubmit}
        />
      </form>
      <PostList
        posts={posts}
        lastElementRef={lastElementRef}
        activeCommentId={activeCommentId}
        handleGetCommentClick={handleGetCommentClick}
      />
    </div>
  )
}

export default UserPosts
