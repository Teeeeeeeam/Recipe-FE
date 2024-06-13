import Image from 'next/image'
import React from 'react'

interface BlackListHeaderProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  handleSearchClick: () => void
  selectAll: boolean
  handleSelectAll: () => void
  setIsSelectMenuOpen: (open: boolean) => void
  isSelectMenuOpen: boolean
  handleBulkUnblock: () => void
}

const BlackListHeader = ({
  searchTerm,
  setSearchTerm,
  handleSearchClick,
  selectAll,
  handleSelectAll,
  setIsSelectMenuOpen,
  isSelectMenuOpen,
  handleBulkUnblock,
}: BlackListHeaderProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick()
    }
  }
  return (
    <>
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h1 className="text-2xl font-semibold">블랙리스트</h1>
        <div className="flex gap-x-2">
          <input
            type="text"
            placeholder="이메일 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="p-2 rounded"
          />
          <button
            onClick={handleSearchClick}
            className="px-4 py-2 bg-green-150 text-white rounded hover:bg-green-100 transition-colors"
          >
            검색
          </button>
        </div>
      </div>
      <ul className="grid grid-cols-[1fr_1fr_4fr_1fr_2fr] gap-4 text-center items-center p-4 bg-gray-100 rounded-md shadow">
        <li className="flex justify-center">
          <div className="flex items-center relative">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="cursor-pointer w-4 h-4"
            />
            <Image
              src={`/svg/down-arrow.svg`}
              alt="down-arrow"
              width={20}
              height={20}
              className="absolute top-0 left-6 cursor-pointer"
              onClick={() => setIsSelectMenuOpen(!isSelectMenuOpen)}
            />
            {isSelectMenuOpen && (
              <div className="absolute top-6 w-16 bg-white border rounded shadow-lg">
                <button
                  onClick={handleBulkUnblock}
                  className="block w-full text-center px-4 py-2 text-sm text-red-500 hover:bg-red-100"
                >
                  해제
                </button>
              </div>
            )}
          </div>
        </li>
        <li>번호</li>
        <li className="text-sm font-semibold">이메일</li>
        <li className="text-sm">차단 여부</li>
        <li>해제</li>
      </ul>
    </>
  )
}

export default BlackListHeader
