import { useState, useCallback, useEffect } from 'react'
import { getMembers } from '@/api/admin-apis'
import { MemberInfo } from '@/types/admin'
import { debounce } from 'lodash'

interface Params {
  loginId?: string
  username?: string
  email?: string
  nickname?: string
}

const useMembers = (params: Params) => {
  const [members, setMembers] = useState<MemberInfo[]>([])
  const [lastId, setLastId] = useState<number | null>(null)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [initialLoading, setInitialLoading] = useState<boolean>(true)
  const { loginId, username, email, nickname } = params

  const fetchMembers = useCallback(
    debounce(async () => {
      if (!hasMore || loading) return
      setLoading(true)

      try {
        const res = await getMembers(
          loginId ?? null,
          username ?? null,
          email ?? null,
          nickname ?? null,
          lastId,
        )

        const newMembers = res.memberInfoes
        if (newMembers) {
          setMembers((prev) => [...prev, ...newMembers])
          setLastId(newMembers[newMembers.length - 1].id)
          setHasMore(res.nextPage)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
        setInitialLoading(false)
      }
    }, 300),
    [loginId, username, email, nickname, hasMore, lastId],
  )

  useEffect(() => {
    setMembers([])
    setLastId(null)
    setHasMore(true)
    setInitialLoading(true)
  }, [loginId, username, email, nickname])
  useEffect(() => {
    if (lastId === null && hasMore) {
      fetchMembers()
    }
  }, [lastId, hasMore])
  return { members, fetchMembers, hasMore, loading, initialLoading }
}

export default useMembers
