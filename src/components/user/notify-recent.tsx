import { inquiryNotifyRecent } from '@/api/notify-apis'
import { Notification } from '@/types/notify'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface NotifyRecentProps {
  eventCount: number
  toggleNotify: boolean
  setToggleNotify: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NotifyRecent({
  eventCount,
  toggleNotify,
  setToggleNotify,
}: NotifyRecentProps) {
  const [notify, setNotify] = useState<Notification[]>([])
  const [isNew, setIsNew] = useState<boolean>(false)

  useEffect(() => {
    if (eventCount !== 0) {
      setIsNew(true)
    }
  }, [eventCount])

  useEffect(() => {
    if (toggleNotify) {
      getInquiryNotificationRecent()
      setIsNew(false)
    }
  }, [toggleNotify])

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
    if (toggleNotify) {
      setToggleNotify(false)
    }
  })
  return (
    <div className="md:mr-2 relative">
      <button
        type="button"
        onClick={() => setToggleNotify((prev) => !prev)}
        className="relative flex itmes-center"
      >
        <Image src="/svg/bell.svg" alt="알림버튼" width={30} height={30} />
        {isNew && (
          <span className="flex absolute top-0 right-1">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
          </span>
        )}
      </button>
      {toggleNotify && (
        <div className="md:absolute md:w-[300px] md:top-[46px] md:left-auto md:right-0 w-full fixed top-[71px] left-0 py-3 px-4 shadow-md bg-white">
          <h5 className="border-b- pb-2">알림</h5>
          {notify.map((item) => {
            return (
              <p key={item.id} className="py-2 mb-1 border-b">
                <Link href={item.url} onClick={() => setToggleNotify(false)}>
                  {item.content}
                </Link>
              </p>
            )
          })}
          <div>
            <Link
              href="/notification"
              onClick={() => setToggleNotify((prev) => !prev)}
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
