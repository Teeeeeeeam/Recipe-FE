'use client'

import { getNoticeDetail } from '@/api/admin-apis'
import { NoticeInfo } from '@/types/admin'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

const NoticeDetail = () => {
  const [noticeInfo, setNoticeInfo] = useState<NoticeInfo | null>(null)

  const params = useParams()
  const { id } = params

  const fetchNoticeDetail = async () => {
    const res = await getNoticeDetail(Number(id))
    setNoticeInfo(res)
  }

  useEffect(() => {
    fetchNoticeDetail()
  }, [])

  return (
    <div className="flex p-2 md:p-10 w-full">
      {noticeInfo && (
        <div>
          <div className="grid grid-cols-[5fr_1fr] justify-between pb-2 border-b border-black break-words">
            <div className="text-[32px] font-bold">
              <p className="break-all">{noticeInfo.noticeTitle}</p>
            </div>
            <div className="flex-col gap-x-2 text-right break-words">
              <p className="font-bold break-words">
                {noticeInfo.member.nickname}
              </p>
              <p>{noticeInfo.createdAt.slice(0, 10)}</p>
            </div>
          </div>
          <div className="mt-4">
            {noticeInfo.imgUrl && (
              <Link href={noticeInfo.imgUrl} target="_black">
                <Image
                  src={noticeInfo.imgUrl}
                  alt="notice_img"
                  width={100}
                  height={100}
                  className="my-2"
                />
              </Link>
            )}
            <div className="break-words word-break break-all">
              {noticeInfo.noticeContent}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NoticeDetail
