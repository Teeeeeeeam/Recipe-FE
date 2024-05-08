'use client'

import RadioButton from '@/components/common/radio-button'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function InquiryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const segment = useSelectedLayoutSegment()
  return (
    <div className="grow shrink">
      <div className="grid grid-cols-2">
        <div className="flex gap-x-2">
          <Link href="/user/id-inquiry">
            <RadioButton boolean={segment === 'id-inquiry' ? true : false} />
          </Link>
          <p>아이디 찾기</p>
        </div>
        <div className="flex gap-x-2">
          <Link href="/user/pw-inquiry">
            <RadioButton boolean={segment === 'pw-inquiry' ? true : false} />
          </Link>
          <p>비밀번호 찾기</p>
        </div>
      </div>
      {children}
    </div>
  )
}
