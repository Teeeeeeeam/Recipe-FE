import Image from 'next/image'

import { deleteMembers } from '@/api/admin-apis'
import useCheckbox from '@/hooks/use-check-box'
import { MemberInfo } from '@/types/admin'

interface MemberListProps {
  members: MemberInfo[]
  lastElementRef: React.RefObject<HTMLDivElement>
}

const MemberList = ({ members, lastElementRef }: MemberListProps) => {
  const {
    deleteList,
    selectAll,
    handleCheckboxChange,
    handleSelectAll,
    handleAllDeleteClick,
    handleDeleteClick,
  } = useCheckbox()

  return (
    <div className="bg-navy-50 p-2 text-white rounded-md">
      <ul className="grid grid-cols-[1fr_2fr_2fr_2fr_3fr_1fr] items-center text-[12px] lg:text-[16px] text-center bg-navy-100 py-4 rounded-t-md">
        <li className="flex justify-center items-center">
          <div className="relative">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={() => handleSelectAll(members.map((el) => el.id))}
              className="cursor-pointer w-5 h-5"
            />
            <Image
              src={`/svg/trash.svg`}
              alt="delete-icon"
              width={40}
              height={40}
              className="absolute top-0 left-6 cursor-pointer translate-transition hover:scale-x-110"
              onClick={() => handleAllDeleteClick(deleteList, deleteMembers)}
              priority
            />
          </div>
        </li>
        <li>이름</li>
        <li>닉네임</li>
        <li>아이디</li>
        <li>이메일</li>
        <li>관리</li>
      </ul>
      <div className="flex flex-col space-y-2 mt-2">
        {members &&
          members.map((el) => (
            <ul
              key={el.id}
              className="grid grid-cols-[1fr_2fr_2fr_2fr_3fr_1fr] text-[12px] lg:text-[16px] text-center py-4 bg-navy-100"
            >
              <li className="flex justify-center items-center">
                <input
                  type="checkbox"
                  checked={deleteList.includes(el.id)}
                  onChange={() => handleCheckboxChange(el.id)}
                  className="cursor-pointer w-5 h-5"
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
                  className="hover:text-green-150"
                >
                  추방
                </button>
              </li>
            </ul>
          ))}
        <div ref={lastElementRef}></div>
      </div>
    </div>
  )
}

export default MemberList
