'use client'

import { deleteNotice } from '@/api/admin-apis'
import useCheckbox from '@/hooks/use-check-box'
import { NoticeInfo } from '@/types/admin'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
interface NoticeListProps {
  notices: NoticeInfo[]
  lastElementRef: React.RefObject<HTMLDivElement>
}

const NoticeList = ({ notices, lastElementRef }: NoticeListProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [hoveredNotice, setHoveredNotice] = useState<NoticeInfo | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    deleteList,
    selectAll,
    handleCheckboxChange,
    handleSelectAll,
    handleAllDeleteClick,
    handleDeleteClick,
  } = useCheckbox()

  const handleMouseEnter = (notice: NoticeInfo) => {
    setHoveredNotice(notice)
    setIsModalOpen(true)
  }

  const handleMouseLeave = () => {
    setHoveredNotice(null)
    setIsModalOpen(false)
  }

  return (
    <div className="bg-white md:p-4 mt-4 rounded shadow text-[12px] md:text-[14px]">
      <ul className="grid grid-cols-[0.5fr_2fr_1fr_1fr] md:grid-cols-[0.5fr_1fr_3fr_2fr_2fr_2fr] text-center font-semibold bg-gray-200 p-2 rounded-t">
        <li className="flex justify-center">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={() => handleSelectAll(notices.map((el) => el.id))}
              className="cursor-pointer w-3 h-3 md:w-4 md:h-4"
            />
            <Image
              src={`/svg/down-arrow.svg`}
              alt="delete-icon"
              width={40}
              height={40}
              className="absolute top-[1px] left-3 ml-2 cursor-pointer"
              onClick={() => setIsDeleteOpen(!isDeleteOpen)}
              priority
            />
            {isDeleteOpen && (
              <div className="absolute top-6 w-16 z-20 bg-white border rounded shadow-lg">
                <button
                  type="button"
                  className="block w-full text-center px-4 py-2 text-sm text-red-500 hover:bg-red-100"
                  onClick={() => handleAllDeleteClick(deleteList, deleteNotice)}
                >
                  추방
                </button>
              </div>
            )}
          </div>
        </li>
        <li className="hidden md:block">번호</li>
        <li>제목</li>
        <li>글쓴이</li>
        <li className="hidden md:block">등록일자</li>
        <li>관리</li>
      </ul>
      <div className="flex flex-col space-y-2 mt-2">
        {notices &&
          notices.map((notice) => (
            <ul
              key={notice.id}
              className="relative grid grid-cols-[0.5fr_2fr_1fr_1fr] md:grid-cols-[0.5fr_1fr_3fr_2fr_2fr_2fr] text-center p-2 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              onMouseEnter={(e) => handleMouseEnter(notice)}
              onMouseLeave={handleMouseLeave}
            >
              <li className="flex justify-center items-center">
                <input
                  type="checkbox"
                  checked={deleteList.includes(notice.id)}
                  onChange={() => handleCheckboxChange(notice.id)}
                  className="w-3 h-3 md:w-4 md:h-4 cursor-pointer"
                />
              </li>
              <li className="hidden md:block">{notice.id}</li>
              <Link href={`/notices/${notice.id}`}>
                <li>{notice.noticeTitle}</li>
              </Link>
              <li>{notice.member.nickname}</li>
              <li className="hidden md:block">{notice.createdAt}</li>
              <li>
                <button className="text-blue-100 hover:text-blue-150">
                  <Link href={`/admin/notices/modify/${notice.id}`}>수정</Link>
                </button>
                <span>{` / `}</span>
                <button
                  onClick={() => handleDeleteClick(notice.id, deleteNotice)}
                  className="text-red-500 hover:text-red-700"
                >
                  삭제
                </button>
              </li>

              {hoveredNotice &&
                hoveredNotice.id === notice.id &&
                isModalOpen && (
                  <div className="absolute break-words top-[110%] left-[25%] max-w-[200px] md:max-w-[300px]   bg-white border rounded shadow-lg p-4 z-10">
                    <ul className="w-full list-none p-0 m-0 text-left ">
                      <li>
                        <span className="font-bold">{`제목 : `}</span>
                        <span>{hoveredNotice.noticeTitle}</span>
                      </li>
                      <li>
                        <span className="font-bold">{`글쓴이 : `}</span>
                        <span>{hoveredNotice.member.nickname}</span>
                      </li>
                    </ul>
                  </div>
                )}
            </ul>
          ))}
        <div ref={lastElementRef}></div>
      </div>
    </div>
  )
}

export default NoticeList
