import { deleteNotice } from '@/api/admin-apis'
import useCheckbox from '@/hooks/use-check-box'
import { NoticeInfo } from '@/types/admin'
import Image from 'next/image'
import Link from 'next/link'

interface NoticeListProps {
  notices: NoticeInfo[]
  lastElementRef: React.RefObject<HTMLDivElement>
}

const NoticeList = ({ notices, lastElementRef }: NoticeListProps) => {
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
      <ul className="grid grid-cols-[1fr_1fr_3fr_2fr_2fr_2fr] items-center text-[12px] lg:text-[16px] text-center bg-navy-100 py-4 rounded-t-md ">
        <li className="flex justify-center items-center">
          <div className="relative">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={() => handleSelectAll(notices.map((el) => el.id))}
              className="cursor-pointer w-5 h-5"
            />
            <Image
              src={`/svg/trash.svg`}
              alt="delete-icon"
              width={40}
              height={40}
              className="absolute top-0 left-[25px] cursor-pointer translate-transition hover:scale-x-110"
              onClick={() => handleAllDeleteClick(deleteList, deleteNotice)}
              priority
            />
          </div>
        </li>
        <li>번호</li>
        <li>제목</li>
        <li>글쓴이</li>
        <li>등록일자</li>
        <li>관리</li>
      </ul>
      <div className="flex flex-col space-y-2 mt-2">
        {notices &&
          notices.map((el) => (
            <ul
              key={el.id}
              className="grid grid-cols-[1fr_1fr_3fr_2fr_2fr_2fr] items-center text-[12px] lg:text-[16px] text-center bg-navy-100 py-4"
            >
              <li className="flex justify-center items-center">
                <input
                  type="checkbox"
                  checked={deleteList.includes(el.id)}
                  onChange={() => handleCheckboxChange(el.id)}
                  className="cursor-pointer w-5 h-5"
                />
              </li>
              <li>{el.id}</li>
              <Link href={`/notice/${el.id}`}>
                <li>{el.noticeTitle}</li>
              </Link>
              <li>{el.member.nickname}</li>
              <li>{el.createdAt}</li>
              <li>
                <button className="hover:text-green-150">
                  <Link href={`/admin/notice/modify/${el.id}`}>수정</Link>
                </button>
                <span>{` / `}</span>
                <button
                  onClick={() => handleDeleteClick(el.id, deleteNotice)}
                  className="hover:text-green-150"
                >
                  삭제
                </button>
              </li>
            </ul>
          ))}
        <div ref={lastElementRef}></div>
      </div>
    </div>
  )
}

export default NoticeList
