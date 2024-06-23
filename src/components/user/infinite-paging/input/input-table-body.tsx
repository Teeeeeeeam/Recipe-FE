import { MyQuestion } from '@/types/user'
import InputTableBodyCommon from './input-table-body-common'
import { Notification } from '@/types/notify'

interface InputTableBodyProps {
  data: MyQuestion[] | Notification[] | []
  isStatus: boolean
  onChange: (value: number) => void
  onClick: (group: boolean, thisIds: number | null) => Promise<void>
}

export interface ConvertData {
  id: number
  title: string
  url: string
  status?: string
}

export default function InputTableBody({
  data,
  isStatus,
  onChange,
  onClick,
}: InputTableBodyProps) {
  function isMyQusetion(isItem: any): isItem is MyQuestion {
    return (isItem as MyQuestion).id !== undefined
  }
  function isNotification(isItem: any): isItem is Notification {
    return (isItem as Notification).id !== undefined
  }

  function converHandler(
    item: MyQuestion | Notification,
  ): ConvertData | undefined {
    if (isStatus && isMyQusetion(item)) {
      return {
        id: item.id,
        title: item.title,
        url: `/my-page/success/answer/${item.id}`,
        status: item.status,
      }
    } else if (!isStatus && isNotification(item)) {
      return {
        id: item.id,
        title: item.content,
        url: item.url,
      }
    } else undefined
  }
  return (
    <tbody>
      {data.map((item) => {
        const convertData = converHandler(item)
        return (
          convertData && (
            <tr key={convertData.id}>
              <InputTableBodyCommon
                convertData={convertData}
                isStatus={isStatus}
                onChange={onChange}
                onClick={onClick}
              />
            </tr>
          )
        )
      })}
    </tbody>
  )
}
