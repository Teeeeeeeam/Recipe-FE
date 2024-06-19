import { useState, useCallback } from 'react'
import { getMembers } from '@/api/admin-apis'
import { MemberInfo } from '@/types/admin'

interface SearchParams {
  loginId?: string
  username?: string
  email?: string
  nickname?: string
}

const useMembers = (searchParams: SearchParams) => {
  const [members, setMembers] = useState<MemberInfo[]>([])
  const [lastId, setLastId] = useState<number | null>(null)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const { loginId, username, email, nickname } = searchParams

  const fetchMembers = useCallback(async () => {
    if (!hasMore) return

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
    }
  }, [loginId, username, email, nickname, hasMore, lastId])

  return { members, setMembers, fetchMembers, hasMore }
}

export default useMembers
