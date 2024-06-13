'use client'

import { deleteBlackList, getBlackList } from '@/api/admin-apis'
import useCheckbox from '@/hooks/use-check-box'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { BlackListInfo } from '@/types/admin'
import { useState, useEffect, useCallback } from 'react'
import Modal from './modal'
import BlackListHeader from './header'
import BlackListItem from './list-item'

const BlackList = () => {
  const [lastId, setLastId] = useState<number | null>(null)
  const [blackLists, setBlackLists] = useState<BlackListInfo[]>([])
  const [nextPage, setNextPage] = useState<boolean>(true)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<number[] | null>(null)
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [email, setEmail] = useState<string | null>(null)

  const fetchGetBlackList = useCallback(
    async (reset = false) => {
      if (reset) {
        setLastId(null)
        setBlackLists([])
        setNextPage(true)
      }
      if (!nextPage) return
      try {
        const res = await getBlackList(lastId, email ?? null)
        const newBlackLists = res.blackList
        if (newBlackLists.length) {
          lastId !== null
            ? setBlackLists((prev) => [...prev, ...newBlackLists])
            : setBlackLists([...newBlackLists])
          setLastId(newBlackLists[newBlackLists.length - 1].id)
          setNextPage(res.nextPage)
        }
      } catch (err) {
        console.log(err)
      }
    },
    [lastId, nextPage, email],
  )

  const lastElementRef = useInfiniteScroll(fetchGetBlackList, nextPage)

  const {
    deleteList,
    setDeleteList,
    selectAll,
    handleCheckboxChange,
    handleSelectAll,
  } = useCheckbox()

  const handleOpenModal = (id: number) => {
    setSelectedId([id])
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedId(null)
    setIsModalOpen(false)
  }

  const handleUnblockClick = async () => {
    if (selectedId !== null) {
      await deleteBlackList(selectedId)
      setBlackLists((prev) => prev.filter((el) => !selectedId.includes(el.id)))
      setDeleteList((prev) => prev.filter((id) => !selectedId.includes(id)))
      handleCloseModal()
    }
  }

  const handleSelectedUnblockClick = async () => {
    if (deleteList.length > 0) {
      await deleteBlackList(deleteList)
      setBlackLists((prev) => prev.filter((el) => !deleteList.includes(el.id)))
      setDeleteList([])
      handleCloseModal()
    }
  }
  const handleSearchClick = () => {
    setEmail(searchTerm)
    fetchGetBlackList(true)
  }
  return (
    <div className="container mx-auto p-4">
      <BlackListHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearchClick={handleSearchClick}
        selectAll={selectAll}
        handleSelectAll={() => handleSelectAll(blackLists.map((el) => el.id))}
        setIsSelectMenuOpen={setIsSelectMenuOpen}
        isSelectMenuOpen={isSelectMenuOpen}
        handleBulkUnblock={() => {
          setSelectedId(deleteList)
          setIsModalOpen(true)
        }}
      />
      {blackLists &&
        blackLists.map((el) => (
          <BlackListItem
            key={el.id}
            item={el}
            isChecked={deleteList.includes(el.id)}
            handleCheckboxChange={handleCheckboxChange}
            handleOpenModal={handleOpenModal}
          />
        ))}
      <div ref={lastElementRef}></div>

      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          onConfirm={
            selectedId && selectedId.length > 1
              ? handleSelectedUnblockClick
              : handleUnblockClick
          }
        />
      )}
    </div>
  )
}

export default BlackList
