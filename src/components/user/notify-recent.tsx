'use client'

import { inquiryNotifyRecent } from '@/api/notify-apis'
import { Notification } from '@/types/notify'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NotifyRecent({ eventCount }: { eventCount: number }) {
  const [notify, setNotify] = useState<Notification[]>([])
  const [isClick, setIsClick] = useState<boolean>(false)
  const [isNew, setIsNew] = useState<boolean>(false)

  useEffect(() => {
    if (eventCount !== 0) {
      setIsNew(true)
    }
  }, [eventCount])

  useEffect(() => {
    if (isClick) {
      getInquiryNotificationRecent()
      setIsNew(false)
    }
  }, [isClick])

  async function getInquiryNotificationRecent() {
    try {
      const result = await inquiryNotifyRecent('/api/user/main/notification')
      setNotify(result.data.notification)
    } catch (error) {
      console.log(error)
    }
  }

  const bodyWithoutHeader = document.querySelector('body>div')
  bodyWithoutHeader?.addEventListener('click', () => {
    if (isClick) {
      setIsClick(false)
    }
  })
  return (
    <div>
      <button
        type="button"
        onClick={() => setIsClick(!isClick)}
        className="relative flex itmes-center mr-3"
      >
        <Image src="/svg/bell.svg" alt="알림버튼" width={30} height={30} />
        {isNew && (
          <span className="absolute w-[10px] h-[10px] right-1 top-1 bg-red-50 rounded-full"></span>
        )}
      </button>
      {isClick && (
        <div className="sm:absolute sm:w-auto sm:left-auto w-full fixed top-[71px] left-0 py-3 px-4 shadow-md bg-white">
          <h5 className="border-b- pb-2">알림</h5>
          {notify.map((item) => {
            return (
              <p key={item.id} className="py-2 mb-1 border-b">
                <Link href={item.url} onClick={() => setIsClick(false)}>
                  {item.content}
                </Link>
              </p>
            )
          })}
          <div>
            <Link
              href="/notification"
              onClick={() => setIsClick((prev) => !prev)}
              className="block text-center"
            >
              전체 보기
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
