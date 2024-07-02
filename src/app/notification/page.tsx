'use client'
import { deleteNotify, inquiryNotify } from '@/api/notify-apis'
import InputDeleteButton from '@/components/user/infinite-paging/input/input-delete-button'
import InputTableBody from '@/components/user/infinite-paging/input/input-table-body'
import InputTableBodyNoData from '@/components/user/infinite-paging/input/input-table-body-no-data'
import InputTableHeader from '@/components/user/infinite-paging/input/input-table-header'
import { Notification } from '@/types/notify'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function Notification() {
  const [notify, setNotify] = useState<Notification[] | []>([])
  const [next, setNext] = useState<boolean>(false)
  const [lastId, setLastId] = useState<number | null>(null)
  const [mount, setMount] = useState<boolean>(false)
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false)
  const [checkedItems, setCheckedItems] = useState<number[]>([])

  const loader = useRef(null)

  useEffect(() => {
    getInquiryNotification(true)
  }, [mount])

  async function getInquiryNotification(isInit: boolean) {
    try {
      const option = {
        size: 10,
      }
      const result = await inquiryNotify(option, lastId)
      if (isInit) {
        setNotify(result.data.notification)
      } else {
        setNotify((prev) => {
          const newData = result.data.notification
          return [...prev, ...newData]
        })
      }
      if (result.data.notification.length > 0) {
        const dataLastId =
          result.data.notification[result.data.notification.length - 1].id
        setLastId(dataLastId)
      }
      setNext(result.data.hasNext)
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteNotificationHandler(
    group: boolean,
    thisIds: number | null,
  ) {
    try {
      const delData = group ? thisIds : checkedItems
      await deleteNotify(delData)
      setLastId(null)
      setIsAllChecked(false)
      setCheckedItems(checkedItems.filter((item) => item !== thisIds))
      setMount((prev) => !prev)
    } catch (error) {
      console.log(error)
    }
  }

  function allCheckHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    const checked = e.target.checked
    const inputHandler = (isAll: boolean) => {
      const checkbox = document.querySelectorAll<HTMLInputElement>('.chk_box')
      checkbox.forEach((item) => {
        item.checked = isAll
      })
    }
    if (checked) {
      const allIds = notify.map((item) => item.id)
      inputHandler(true)
      setCheckedItems(allIds)
    } else {
      inputHandler(false)
      setCheckedItems([])
    }
    setIsAllChecked(checked)
  }

  function eachCheckHandler(id: number): void {
    const newData = checkedItems.includes(id)
      ? checkedItems.filter((item) => item !== id)
      : [...checkedItems, id]
    setCheckedItems(newData)
    setIsAllChecked(newData.length === notify.length)
  }

  // Intersection Observer 콜백 함수
  const handleObserver = useCallback(
    (entries: any) => {
      const target = entries[0]
      if (target.isIntersecting) {
        if (next) {
          getInquiryNotification(false)
        }
      }
    },
    [notify],
  )
  // Intersection Observer 설정
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    }
    const observer = new IntersectionObserver(handleObserver, option)
    if (loader.current) {
      observer.observe(loader.current)
    }
    return () => observer.disconnect()
  }, [handleObserver])

  return (
    <>
      <h4 className="text-center text-lg mb-3">알림</h4>
      <div className="h-[60vh] sm:h-[70vh] bg-white overflow-y-scroll mb-3">
        <div className="rounded-lg">
          <table className="w-full border-gray-200 table-fixed">
            <InputTableHeader
              theadOptions={[
                { class: 'p-2', title: '제목' },
                { class: 'p-2 sm:w-[10%] w-[20%]', title: '삭제' },
              ]}
              isChecked={isAllChecked}
              onChange={allCheckHandler}
            />
            {notify.length > 0 ? (
              <InputTableBody
                data={notify}
                isStatus={false}
                onChange={eachCheckHandler}
                onClick={deleteNotificationHandler}
              />
            ) : (
              <InputTableBodyNoData isStatus={false} />
            )}

            <tfoot ref={loader}></tfoot>
          </table>
        </div>
      </div>
      <div className="text-end">
        <InputDeleteButton onClick={deleteNotificationHandler} />
      </div>
    </>
  )
}
