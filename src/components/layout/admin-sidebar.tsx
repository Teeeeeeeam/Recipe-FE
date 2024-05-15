'use client'
import { useSelectedLayoutSegment } from 'next/navigation'
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
      <h2 className="mb-2">Menu</h2>
      <AdminButton id="user" segment={segment}>
        사용자 관리
      </AdminButton>
      <AdminButton id="board" segment={segment}>
        회원 게시글 관리
      </AdminButton>
      <Link href="/admin/recipe" className="w-full">
        <AdminButton id="recipe" segment={segment}>
          레시피 관리
        </AdminButton>
      </Link>
      <AdminButton id="comment" segment={segment}>
        댓글 관리
      </AdminButton>
      <AdminButton id="notice" segment={segment}>
        공지사항 관리
      </AdminButton>
      <AdminButton id="qna" segment={segment}>
        고객 지원
      </AdminButton>
    </div>
  )
}

export default AdminSidebar
