'use client'
import { getNotices } from '@/api/admin-apis'
import { NoticeInfo } from '@/types/admin'
import { useState, useCallback } from 'react'

interface SearchParams {
  title?: string
}

const useNotice = (searchParams: SearchParams) => {
  const [notices, setNotices] = useState<NoticeInfo[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [lastId, setLastId] = useState<number | null>(null)

  const { title } = searchParams

  const fetchNotice = useCallback(async () => {
    if (!hasMore) return
    try {
      const res = await getNotices(lastId, title ?? null)
      const newNotices = res.notice
      if (newNotices) {
        setNotices((prev) => [...prev, ...newNotices])
        setHasMore(res.nextPage)
        setLastId(newNotices[newNotices.length - 1].id)
      }
    } catch (err) {
      console.log(err)
    }
  }, [hasMore, lastId])

  return { notices, setNotices, fetchNotice, hasMore }
}

export default useNotice
