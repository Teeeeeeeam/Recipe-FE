'use client'

import { Response } from '@/types/auth'
import { useState } from 'react'

const useCheckbox = (initialItems = []) => {
  const [deleteList, setDeleteList] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState<boolean>(false)

  const handleCheckboxChange = (itemId: number) => {
    setDeleteList((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    )
  }

  const handleSelectAll = (items: number[]) => {
    if (selectAll) {
      setDeleteList([])
    } else {
      setDeleteList(items)
    }
    setSelectAll(!selectAll)
  }

  const handleAllDeleteClick = async (
    deleteItems: number[],
    deleteFunction: (ids: number[]) => Promise<Response>,
  ) => {
    if (deleteList.length > 0) {
      if (confirm('선택된 항목을 삭제하시겠습니까?')) {
        await deleteFunction(deleteList)
        alert('삭제되었습니다.')
        location.reload()
      }
    }
  }
  const handleDeleteClick = async (
    id: number,
    deleteFunction: (id: number[]) => Promise<Response>,
  ) => {
    if (confirm('해당 항목을 삭제 하시겠습니까?')) {
      await deleteFunction([id])
      alert('해당 항목이 삭제 되었습니다.')
      location.reload()
    }
  }

  return {
    deleteList,
    selectAll,
    handleCheckboxChange,
    handleSelectAll,
    handleAllDeleteClick,
    handleDeleteClick,
  }
}

export default useCheckbox
