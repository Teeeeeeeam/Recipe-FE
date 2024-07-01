'use client'

import { useState } from 'react'
import Image from 'next/image'
import AdminSidebar from '@/components/layout/admin-sidebar'
import { useSelectedLayoutSegment } from 'next/navigation'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const segment = useSelectedLayoutSegment()
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div
      className={`relative  ${isSidebarOpen ? 'lg:grid lg:grid-cols-[250px_1fr]' : 'grid grid-cols-[60px_1fr]'} w-full h-full`}
    >
      <div className="absolute top-4 left-[10px] z-20">
        <Image
          src={'/svg/hamburger.svg'}
          alt="category-btn"
          width={36}
          height={36}
          className={`cursor-pointer z-20 transition-transform hover:scale-125`}
          onClick={toggleSidebar}
        />
      </div>

      <div
        className={`${isSidebarOpen ? 'fixed lg:static' : 'static'} z-10 h-full bg-gray-100 opacity-100 shadow-md`}
      >
        <AdminSidebar isOpen={isSidebarOpen} segment={segment} />
      </div>

      <div className="pt-10 pb-6 px-6 h-full w-full z-0">{children}</div>
    </div>
  )
}

export default AdminLayout
