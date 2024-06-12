'use client'

import { postUserInfo } from '@/api/auth-apis'
import { setLocalStorage } from '@/lib/local-storage'
import { useAppDispatch } from '@/store'
import { getLoginInfo } from '@/store/user-info-slice'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Link = ({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) => {
  const accessToken = searchParams['access-token']
  const dispatch = useAppDispatch()
  const router = useRouter()

  const fetchLogin = async () => {
    setLocalStorage('accessToken', accessToken)
    const userInfo = await postUserInfo()
    dispatch(getLoginInfo(userInfo))
    router.push('/')
  }
  useEffect(() => {
    fetchLogin()
  }, [])
}

export default Link
