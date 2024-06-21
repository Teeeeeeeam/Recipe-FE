'use client'
import Image from 'next/image'

import { deleteMembers } from '@/api/admin-apis'
import useCheckbox from '@/hooks/use-check-box'
import { MemberInfo } from '@/types/admin'
import { useState } from 'react'

interface MemberListProps {
  members: MemberInfo[]
  lastElementRef: React.RefObject<HTMLDivElement>
}

const MemberList = ({ members, lastElementRef }: MemberListProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [hoveredMember, setHoveredMember] = useState<MemberInfo | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    deleteList,
    selectAll,
    handleCheckboxChange,
    handleSelectAll,
    handleAllDeleteClick,
    handleDeleteClick,
  } = useCheckbox()

  const handleMouseEnter = (member: MemberInfo) => {
    setHoveredMember(member)
    setIsModalOpen(true)
  }

  const handleMouseLeave = () => {
    setHoveredMember(null)
    setIsModalOpen(false)
  }

  return (
    <div className="bg-white p-4 rounded shadow text-[12px] md:text-[14px]">
      <ul className="grid grid-cols-[0.5fr_2fr_2fr_2fr_3fr_1fr] text-center font-semibold bg-gray-200 p-2 rounded-t">
        <li className="flex justify-center">
          <div className="flex items-center relative">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={() => handleSelectAll(members.map((el) => el.id))}
              className="cursor-pointer"
            />
            <Image
              src={`/svg/down-arrow.svg`}
              alt="delete-icon"
              width={16}
              height={16}
              className="absolute top-[3px] left-2 ml-2 cursor-pointer"
              onClick={() => setIsDeleteOpen(!isDeleteOpen)}
            />
            {isDeleteOpen && (
              <div className="absolute top-6 w-16 z-20 bg-white border rounded shadow-lg">
                <button
                  type="button"
                  className="block w-full text-center px-4 py-2 text-sm text-red-500 hover:bg-red-100 "
                  onClick={() =>
                    handleAllDeleteClick(deleteList, deleteMembers)
                  }
                >
                  추방
                </button>
              </div>
            )}
          </div>
        </li>
        <li>이름</li>
        <li>닉네임</li>
        <li>아이디</li>
        <li>이메일</li>
        <li>관리</li>
      </ul>
      <div className="divide-y">
        {members.map((el) => (
          <ul
            key={el.id}
            className="relative grid grid-cols-[0.5fr_2fr_2fr_2fr_3fr_1fr] text-center p-2 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            onMouseEnter={(e) => handleMouseEnter(el)}
            onMouseLeave={handleMouseLeave}
          >
            <li>
              <input
                type="checkbox"
                checked={deleteList.includes(el.id)}
                onChange={() => handleCheckboxChange(el.id)}
                className="cursor-pointer"
              />
            </li>
            <li>{el.username}</li>
            <li>{el.nickname}</li>
            <li>
              {el.loginId.length > 16
                ? `${el.loginId.slice(0, 16)}...`
                : el.loginId}
            </li>
            <li>{el.email}</li>
            <li>
              <button
                onClick={() => handleDeleteClick(el.id, deleteMembers)}
                className="text-red-500 hover:text-red-700"
              >
                추방
              </button>
            </li>
            {hoveredMember && hoveredMember.id === el.id && isModalOpen && (
              <div className="absolute break-words bottom-[110%] left-[50%] w-[300px]  bg-white border rounded shadow-lg p-4 z-10">
                <ul className="w-full list-none p-0 m-0 text-left ">
                  <li>
                    <span className="font-bold">{`이름 : `}</span>
                    <span>{hoveredMember.username}</span>
                  </li>
                  <li>
                    <span className="font-bold">{`닉네임 : `}</span>
                    <span>{hoveredMember.nickname}</span>
                  </li>
                  <li>
                    <span className="font-bold">{`아이디 : `}</span>
                    <span>{hoveredMember.loginId}</span>
                  </li>
                  <li>
                    <span className="font-bold">{`이메일 : `}</span>
                    <span>{hoveredMember.email}</span>
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

export default MemberList
