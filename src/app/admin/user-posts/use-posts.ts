import { useState, useEffect, useCallback } from 'react'
import { getPosts } from '@/api/admin-apis'
import { PostInfo } from '@/types/admin'
import { debounce } from 'lodash'

export interface Params {
  recipeTitle?: string
  postTitle?: string
  id?: string
}

const usePosts = (params: Params) => {
  const [posts, setPosts] = useState<PostInfo[]>([])
  const [postId, setPostId] = useState<number | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [initialLoading, setInitialLoading] = useState<boolean>(true)
  const { id, recipeTitle, postTitle } = params

  const fetchPosts = useCallback(
    debounce(async () => {
      if (!hasMore || loading) return
      setLoading(true)

      try {
        const res = await getPosts(
          postId,
          id ?? null,
          recipeTitle ?? null,
          postTitle ?? null,
        )
        const newPosts = res.posts

        if (newPosts.length > 0) {
          setPostId(newPosts[newPosts.length - 1].id)
          setPosts((prev) => [...prev, ...newPosts])
          setHasMore(res.nextPage)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
        setInitialLoading(false)
      }
    }, 300),
    [postId, hasMore, id, recipeTitle, postTitle],
  )

  useEffect(() => {
    setPosts([])
    setPostId(null)
    setHasMore(true)
    setInitialLoading(true)
  }, [id, recipeTitle, postTitle])

  useEffect(() => {
    if (postId === null && hasMore) {
      fetchPosts()
    }
  }, [postId, hasMore])
  return { posts, setPosts, fetchPosts, hasMore, loading, initialLoading }
}

export default usePosts
