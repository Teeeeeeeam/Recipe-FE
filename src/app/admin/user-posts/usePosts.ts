import { useState, useEffect, useCallback } from 'react'
import { getPosts } from '@/api/admin-apis'
import { PostInfo } from '@/types/admin'

export interface SearchParams {
  recipeTitle?: string
  postTitle?: string
  id?: string
}

const usePosts = (searchParams: SearchParams) => {
  const [posts, setPosts] = useState<PostInfo[]>([])
  const [postId, setPostId] = useState<number | null>(null)
  const [hasMore, setHasMore] = useState(true)

  const fetchPosts = useCallback(async () => {
    if (!hasMore) return
    try {
      const res = await getPosts(
        postId,
        searchParams.id ?? null,
        searchParams.recipeTitle ?? null,
        searchParams.postTitle ?? null,
      )
      const newPosts = res.posts
      const lastId = newPosts[newPosts.length - 1].id

      setPostId(lastId)
      setPosts((prev) => [...prev, ...newPosts])
      setHasMore(res.nextPage)
    } catch (error) {
      console.log(error)
    }
  }, [postId, hasMore, searchParams])

  return { posts, setPosts, fetchPosts, hasMore }
}

export default usePosts
