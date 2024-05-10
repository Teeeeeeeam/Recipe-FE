'use client'
import { useSelectedLayoutSegment } from 'next/navigation'
import { useState, useEffect } from 'react'
import AdminButton from '../common/admin-button'

const AdminSidebar = () => {
  const [tab, setTab] = useState('')
  const segment = useSelectedLayoutSegment()

  useEffect(() => {
    if (segment) {
      setTab(segment)
    }
  }, [segment])

  return (
    <div className="relative flex flex-col items-center w-[250px] p-8 space-y-2 h-full">
      <h2 className="mb-2">Menu</h2>
      <AdminButton>사용자 관리</AdminButton>
      <AdminButton>회원 게시글 관리</AdminButton>
      <AdminButton>레시피 관리</AdminButton>
      <AdminButton>댓글 관리</AdminButton>
      <AdminButton>공지사항 관리</AdminButton>
      <AdminButton>사용자 관리</AdminButton>
    </div>
  )
}

export default AdminSidebar
