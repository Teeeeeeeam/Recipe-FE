'use client'

import AuthButton from '@/components/common/auth-button'
import { useAppSelector } from '@/store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const IdInquiryResult = () => {
  const searchIdData = useAppSelector((state) => state.searchIdData)
  const router = useRouter()
  useEffect(() => {
    if (searchIdData.data === null && searchIdData.loading === false) {
      if (confirm('올바르지 않은 접근입니다.')) {
        router.push('/user/id-inquiry')
      }
    }
  }, [router])

  return (
    <div>
      <div className="mt-2 text-[14px]">{`해당 이메일로 등록된 아이디 입니다.`}</div>
      <div className="flex items-center justify-center mb-4 py-4 bg-green-50">
        {searchIdData.data?.data[0].login_info}
      </div>
      <a href="/user/login">
        <AuthButton type="button">로그인 하러 가기</AuthButton>
      </a>
    </div>
  )
}

export default IdInquiryResult
