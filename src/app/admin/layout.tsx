'use client'

import AdminSidebar from '@/components/layout/admin-sidebar'
import Image from 'next/image'
import { useSelectedLayoutSegment } from 'next/navigation'
import { useState } from 'react'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isTab, setIsTab] = useState(false)
  const segment = useSelectedLayoutSegment()

  return (
    <div
      className={`relative ${isTab && 'lg:grid lg:grid-cols-[250px_1fr]'} w-full h-full`}
    >
      {isTab || (
        <Image
          src={'/svg/hamburger.svg'}
          alt="category-btn"
          width={36}
          height={36}
          className={`fixed top-[72px] left-0 cursor-pointer z-20 transition-transform hover:scale-125 bg-white rounded-full shadow-md`}
          onClick={() => setIsTab(!isTab)}
        />
      )}

      <div
        className={`fixed lg:static ${isTab || 'hidden'} z-10 h-full bg-navy-100 opacity-100`}
      >
        <div className="relative">
          {isTab && (
            <Image
              src={'/svg/close.svg'}
              alt="category-btn"
              width={36}
              height={36}
              className={`absolute top-0 ${isTab && 'left-[214px]'} cursor-pointer z-20 transition-transform hover:scale-125`}
              onClick={() => setIsTab(!isTab)}
            />
          )}
        </div>
        <AdminSidebar segment={segment} />
      </div>
      <div className="pt-10 px-6 bg-green-50 h-full z-0">{children}</div>
    </div>
  )
}

export default AdminLayout
