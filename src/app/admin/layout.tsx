'use client'

import AdminSidebar from '@/components/layout/admin-sidebar'
import Image from 'next/image'
import { useSelectedLayoutSegment } from 'next/navigation'
import { useState } from 'react'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isTab, setIsTab] = useState(true)
  const segment = useSelectedLayoutSegment()

  return (
    <div
      className={`relative ${isTab && 'md:grid md:grid-cols-[250px_1fr]'} w-full h-full`}
    >
      <Image
        src={`${isTab ? '/svg/close.svg' : '/svg/hamburger.svg'}`}
        alt="category-btn"
        width={36}
        height={36}
        className={`absolute top-0 ${isTab ? 'left-[214px]' : 'left-0'} cursor-pointer z-20 transition-transform hover:scale-125`}
        onClick={() => setIsTab(!isTab)}
      />

      <div
        className={`absolute md:static ${isTab || 'hidden'} z-10 h-full bg-navy-50 opacity-100`}
      >
        <AdminSidebar />
      </div>
      <div className="pt-10 px-6 bg-green-50 h-full z-0">{children}</div>
    </div>
  )
}

export default AdminLayout
