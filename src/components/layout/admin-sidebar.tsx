'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface MenuItem {
  id: string
  title: string
  icon: string
}

interface AdminSidebarProps {
  isOpen: boolean
  segment: string | null
}

const AdminSidebar = ({ isOpen, segment }: AdminSidebarProps) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: 'dash-board', title: '대시보드', icon: '/dashboard.png' },
    { id: 'members', title: '사용자', icon: '/user.png' },
    { id: 'user-posts', title: '회원 게시글', icon: '/review.png' },
    { id: 'recipes', title: '레시피', icon: '/recipe.png' },
    { id: 'notices', title: '공지사항', icon: '/announce.png' },
    { id: 'questions', title: '문의사항', icon: '/qna.png' },
    { id: 'black-list', title: '블랙리스트', icon: '/blacklist.png' },
  ])

  useEffect(() => {
    setMenuItems(menuItems)
  }, [])

  return (
    <div
      className={`flex flex-col ${isOpen ? 'items-start w-[250px]' : 'items-center w-[60px]'} h-full  border-r border-gray-200 pt-12`}
    >
      {menuItems.map((item) => (
        <Link href={`/admin/${item.id}`} key={item.id} className="w-full">
          <div
            className={`flex items-center py-2 px-4 w-full hover:bg-gray-300 ${segment === item.id ? 'bg-gray-300' : ''} rounded-md`}
          >
            <Image
              src={item.icon}
              alt={item.title}
              width={24}
              height={24}
              className="transition-transform hover:scale-125"
            />
            <span className="ml-4">{isOpen ? item.title : ''}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default AdminSidebar
