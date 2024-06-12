'use client'

import { postUserInfo } from '@/api/auth-apis'
import { setLocalStorage } from '@/lib/local-storage'
import { useAppDispatch } from '@/store'
import { getLoginInfo } from '@/store/user-info-slice'
import { useEffect } from 'react'

const Link = ({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) => {
  const accessToken = searchParams['access-token']
  const dispatch = useAppDispatch()

  const fetchLogin = async () => {
    setLocalStorage('accessToken', accessToken)
    const userInfo = await postUserInfo()
    dispatch(getLoginInfo(userInfo))
    console.log(searchParams)
    alert('로그인 성공')
  }
  useEffect(() => {
    fetchLogin()
  }, [])
}

export default Link
