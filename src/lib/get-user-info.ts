import { jwtDecode } from 'jwt-decode'
import { getLocalStorage } from './local-storage'

const getUserInfo = () => {
  const accessToken = getLocalStorage('accessToken')
  const decoded = jwtDecode(accessToken)

  return decoded
}

export default getUserInfo
