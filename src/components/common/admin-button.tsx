'use client'

// admin-button.tsx
import { useState } from 'react'
import Image from 'next/image'

interface AdminButtonProps {
  id: string
  title: string
  icon: string
  isOpen: boolean
}

const AdminButton = ({ id, title, icon, isOpen }: AdminButtonProps) => {
  const [showTitle, setShowTitle] = useState(false)

  return (
    <div className="relative flex items-center w-full">
      <button
        type="button"
        id={id}
        className={`py-3 px-4 w-full flex items-center ${isOpen ? 'justify-start' : 'justify-center'} rounded-md transition-colors duration-200 bg-white text-gray-700 hover:bg-blue-100`}
        onMouseEnter={() => !isOpen && setShowTitle(true)}
        onMouseLeave={() => !isOpen && setShowTitle(false)}
      >
        <Image src={icon} alt={title} width={24} height={24} />
        {isOpen && <span className="ml-4">{title}</span>}
      </button>
      {showTitle && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-sm rounded">
          {title}
        </div>
      )}
    </div>
  )
}

export default AdminButton
