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
  const accessToken = new URL(window.location.href).searchParams.get(
    'access-token',
  )
  console.log(accessToken)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const fetchLogin = async () => {
    if (accessToken) {
      console.log('실행됨')
      setLocalStorage('accessToken', accessToken)
      const userInfo = await postUserInfo()
      dispatch(getLoginInfo(userInfo))
      alert('로그인 완료')
      router.push('/')
    }
  }
  useEffect(() => {
    fetchLogin()
  }, [])
}

export default Link
