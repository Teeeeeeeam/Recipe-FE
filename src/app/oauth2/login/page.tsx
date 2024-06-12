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

  console.log('이건 const로 선언한 토큰', accessToken)
  console.log('이건 그냥 searchParams', searchParams)

  const fetchLogin = async () => {
    console.log('if문 밖')
    if (accessToken) {
      console.log('if문 동작함')
      setLocalStorage('accessToken', accessToken)
      const userInfo = await postUserInfo()
      dispatch(getLoginInfo(userInfo))
      // router.push('/')
    }
  }
  useEffect(() => {
    console.log('useEffect 0번 째')
    fetchLogin()
    console.log('useEffect 1번 째')
  }, [])
}

export default Link
