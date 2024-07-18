'use client'

import { removeLocalStorage } from '@/lib/local-storage'
import { getLoginInfo } from '@/store/user-info-slice'
import Link from 'next/link'
import { useDispatch } from 'react-redux'

export default function UnLink() {
  const dispatch = useDispatch()

  const isUnLink = new URL(window.location.href).searchParams.get('status')
  if (isUnLink == 'true') {
    const nullState = {
      id: null,
      loginId: null,
      loginType: null,
      nickName: null,
      roles: null,
    }
    removeLocalStorage('accessToken')
    dispatch(getLoginInfo(nullState))
  } else if (isUnLink == 'false') {
    window.location.href = '/'
  }
  return (
    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div className="bg-white px-10 py-14 rounded-md text-center">
        <p className="text-xl mb-4 font-bold text-slate-500">
          이용해주셔서 감사합니다
        </p>
        <Link href="/" className="text-2xl text-lime-800">
          홈으로 이동
        </Link>
      </div>
    </div>
  )
}
