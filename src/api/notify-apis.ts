import requester from '.'
import { Notification } from '@/types/notify'

// 실시간 알림 SSE
interface InquiryNotify {
  payload: {
    success: boolean
    message: string
    data: {
      notification: Notification[] | []
      hasNext: boolean
    }
  }
}
export async function inquiryNotify(
  params: { size: number },
  lastId: number | null,
) {
  const { payload }: InquiryNotify = await requester({
    method: 'GET',
    url: `/api/user/info/notification${lastId ? `?lastId=${lastId}` : ''}`,
    params,
  })
  return payload
}

// 알림 최신 7개 조회
interface InquiryNotifyRecent {
  payload: {
    success: boolean
    message: string
    data: {
      notification: Notification[] | []
    }
  }
}
export async function inquiryNotifyRecent(apiPath: string) {
  const { payload }: InquiryNotifyRecent = await requester({
    method: 'GET',
    url: apiPath,
  })
  return payload
}

// 알림 삭제
export async function deleteNotify(notificationIds: number | number[] | null) {
  // 일괄 삭제
  if (Array.isArray(notificationIds)) {
    const { payload } = await requester({
      method: 'DELETE',
      url: '/api/user/notification',
      params: { notificationIds },
      paramsSerializer: (paramObj) => {
        const params = new URLSearchParams()
        for (let key in paramObj) {
          const value: string[] = paramObj[key]
          value.forEach((val) => params.append(key, val))
        }
        return params.toString()
      },
    })
    return payload
  } else {
    // 단일 삭제
    const { payload } = await requester({
      method: 'DELETE',
      url: '/api/user/notification',
      params: { notificationIds },
    })
    return payload
  }
}
