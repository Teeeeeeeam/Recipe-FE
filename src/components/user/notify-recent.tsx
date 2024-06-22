'use client'

import { inquiryNotifyRecent } from '@/api/notify-apis'
import { Notification } from '@/types/notify'
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
  return (
    <div>
      <button
        type="button"
        onClick={() => setIsClick(!isClick)}
        className={`${isNew ? 'text-red-50' : ''}`}
      >
        알림
      </button>
      {isClick && (
        <div className="absolute bg-white">
          {notify.map((item) => {
            return (
              <p key={item.id}>
                <Link href={item.url}>{item.content}</Link>
              </p>
            )
          })}
        </div>
      )}
    </div>
  )
}
