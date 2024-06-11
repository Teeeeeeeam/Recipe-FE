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
    <div className="flex flex-col items-center w-[250px] p-8 space-y-2 h-full border-r-[1px] border-navy-150">
      <h2 className="mb-2 cursor-pointer transition-transform hover:scale-110">
        <Link href="/admin">Menu</Link>
      </h2>
      <Link href="/admin" className="w-full">
        <AdminButton id="" segment={segment}>
          통계
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
      <Link href="/admin/recipe" className="w-full">
        <AdminButton id="recipe" segment={segment}>
          레시피
        </AdminButton>
      </Link>
      <Link href="/admin/notice" className="w-full">
        <AdminButton id="notice" segment={segment}>
          공지사항
        </AdminButton>
      </Link>
      <Link href="/admin/questions" className="w-full">
        <AdminButton id="questions" segment={segment}>
          문의사항
        </AdminButton>
      </Link>
    </div>
  )
}

export default AdminSidebar
