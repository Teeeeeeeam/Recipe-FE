'use client'

import { postUserInfo } from '@/api/auth-apis'
import { setLocalStorage } from '@/lib/local-storage'
import { useAppDispatch } from '@/store'
import { getLoginInfo } from '@/store/user-info-slice'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Link = ({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) => {
  const accessToken = searchParams['access-token']
  const dispatch = useAppDispatch()
  const router = useRouter()

  // console.log('이건 const로 선언한 토큰', accessToken)
  // console.log('이건 그냥 searchParams', searchParams)

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

  //
  function useQuery() {
    const [foo, setFoo] = useState(null)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const queryObject: any = {}
      params.forEach((value, key) => {
        queryObject[key] = value
      })
      setFoo(queryObject)
    }
    return foo
  }
  const query: any = useQuery()
  const token = query ? query.token : null

  useEffect(() => {
    if (token) {
      console.log('access-token:', token)
      // 필요한 작업 수행 (예: 토큰 저장, API 호출 등)
    } else {
      console.log('Token not found')
    }
  }, [token])

  return <></>
}

export default Link
