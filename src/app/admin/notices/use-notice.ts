'use client'
import { getNotices } from '@/api/admin-apis'
import { NoticeInfo } from '@/types/admin'
import { debounce } from 'lodash'
import { useState, useCallback, useEffect } from 'react'

interface SearchParams {
  title?: string
}

const useNotice = (searchParams: SearchParams) => {
  const [notices, setNotices] = useState<NoticeInfo[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [lastId, setLastId] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [initialLoading, setInitialLoading] = useState<boolean>(true)
  const { title } = searchParams

  const fetchNotice = useCallback(
    debounce(async () => {
      if (!hasMore || loading) return
      setLoading(true)
      try {
        const res = await getNotices(lastId, title ?? null)
        const newNotices = res.notice
        if (newNotices.length > 0) {
          setNotices((prev) => [...prev, ...newNotices])
          setHasMore(res.nextPage)
          setLastId(newNotices[newNotices.length - 1].id)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
        setInitialLoading(false)
      }
    }, 500),
    [hasMore, lastId],
  )

  useEffect(() => {
    setNotices([])
    setLastId(null)
    setHasMore(true)
    setInitialLoading(true)
  }, [title])

  useEffect(() => {
    if (lastId === null && hasMore) {
      fetchNotice()
    }
  }, [hasMore, lastId])

  return { notices, setNotices, fetchNotice, hasMore, loading, initialLoading }
}

export default useNotice
