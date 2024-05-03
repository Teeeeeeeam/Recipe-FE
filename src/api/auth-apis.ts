import { Login } from '@/types/auth'
import requester from './index'

export const postLogin = async (id: string, password: string) => {
  //Login type-> payload에 들어갈 결과값
  //method, url, data => requester에 들어가는 매개변수들
  //data : api 요청시 요구하는 body 값들
  const { status, headers, payload } = await requester<Login>({
    method: 'post',
    url: `/api/login`,
    data: { loginId: id, password: password },
  })
  return payload
}
