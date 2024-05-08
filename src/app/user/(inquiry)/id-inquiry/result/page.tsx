'use client'

import AuthButton from '@/components/common/auth-button'
import { useAppSelector } from '@/store'
import Link from 'next/link'

const InquiryResult = () => {
  const searchData = useAppSelector((state) => state.searchData)
  console.log(searchData)
  return (
    <div>
      <div className="mt-2 text-[14px]">{`해당 이메일로 등록된 아이디 입니다.`}</div>
      <div className="flex items-center justify-center mb-4 py-4 bg-green-50">
        {searchData.data?.data[0].login_info}
      </div>
      <Link href="/user/login">
        <AuthButton type="button">로그인 하러 가기</AuthButton>
      </Link>
    </div>
  )
}

export default InquiryResult
