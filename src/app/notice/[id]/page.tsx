'use client'

import { getNoticeDetail } from '@/api/admin-apis'
import { NoticeInfo } from '@/types/admin'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

const NoticeDetail = () => {
  const [noticeInfo, setNoticeInfo] = useState<NoticeInfo | null>(null)

  const params = useParams()
  const { id } = params

  const fetchNoticeDetail = async () => {
    const res = await getNoticeDetail(Number(id))
    setNoticeInfo(res)
    console.log(res)
  }

  useEffect(() => {
    fetchNoticeDetail()
  }, [])
  //사진을 어떻게 할것인가..
  //고정 사진?

  return (
    <div className="p-10">
      {noticeInfo && (
        <div>
          <div className="flex justify-between pb-2 border-b border-green-150">
            <div className="flex text-[32px] font-bold">
              <span>{noticeInfo.noticeTitle}</span>
            </div>
            <div className="flex flex-col gap-x-2 text-right">
              <span className="font-bold">{noticeInfo.member.nickname}</span>
              <span>{noticeInfo.created_at.slice(0, 10)}</span>
            </div>
          </div>
          <div className="mt-4">
            <Image
              src={noticeInfo.img_url}
              alt="notice_img"
              width={100}
              height={100}
              className="my-2"
            />
            <div>{noticeInfo.noticeContent}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NoticeDetail
