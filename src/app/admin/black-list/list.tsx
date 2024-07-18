import { BlackListInfo } from '@/types/admin'

interface BlackListItemProps {
  item: BlackListInfo
  isChecked: boolean
  handleCheckboxChange: (id: number) => void
  handleOpenModal: (id: number) => void
}

const BlackListList = ({
  item,
  isChecked,
  handleCheckboxChange,
  handleOpenModal,
}: BlackListItemProps) => {
  return (
    <div className="grid grid-cols-[1fr_1fr_4fr_1fr_2fr] gap-4 text-center items-center p-4 border-b border-gray-200">
      <li>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => handleCheckboxChange(item.id)}
          className="cursor-pointer w-4 h-4"
        />
      </li>
      <li>{item.id}</li>
      <li className="text-sm font-semibold">{item.email}</li>
      <li className="text-sm text-gray-600">
        {item.blackCheck ? '차단' : '임시 해제'}
      </li>
      <li>
        <button
          onClick={() => handleOpenModal(item.id)}
          className="px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          해제
        </button>
      </li>
    </div>
  )
}

export default BlackListList
