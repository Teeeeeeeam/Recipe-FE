'use client'

import { useState, useEffect } from 'react'
import AdminButton from '../common/admin-button'
import Link from 'next/link'

interface AdminSidebarProps {
  segment: string | null
}

const AdminSidebar = ({ segment }: AdminSidebarProps) => {
  const [tab, setTab] = useState('')

  useEffect(() => {
    if (segment) {
      setTab(segment)
    }
  }, [segment])

  return (
    <div className="flex flex-col items-center w-[250px] p-8 space-y-4 h-full bg-gray-100 border-r border-gray-200 shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-gray-800 cursor-pointer transition-transform hover:scale-110">
        <Link href="/admin/dash-board">Menu</Link>
      </h2>
      <Link href="/admin/dash-board" className="w-full">
        <AdminButton id="dash-board" segment={segment}>
          대시보드
        </AdminButton>
      </Link>
      <Link href="/admin/members" className="w-full">
        <AdminButton id="members" segment={segment}>
          사용자
        </AdminButton>
      </Link>
      <Link href="/admin/user-posts" className="w-full">
        <AdminButton id="user-posts" segment={segment}>
          회원 게시글
        </AdminButton>
      </Link>
      <Link href="/admin/recipes" className="w-full">
        <AdminButton id="recipes" segment={segment}>
          레시피
        </AdminButton>
      </Link>
      <Link href="/admin/notices" className="w-full">
        <AdminButton id="notices" segment={segment}>
          공지사항
        </AdminButton>
      </Link>
      <Link href="/admin/questions" className="w-full">
        <AdminButton id="questions" segment={segment}>
          문의사항
        </AdminButton>
      </Link>
      <Link href="/admin/black-list" className="w-full">
        <AdminButton id="black-list" segment={segment}>
          블랙리스트
        </AdminButton>
      </Link>
    </div>
  )
}

export default AdminSidebar
