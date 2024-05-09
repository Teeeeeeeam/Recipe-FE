import { FocusEvent, Dispatch, SetStateAction } from 'react'
const handleInputBlur = (
  event: FocusEvent<HTMLInputElement>,
  value: string,
  setValue: Dispatch<SetStateAction<Record<string, string>>>,
  reg?: RegExp | null,
  password?: string,
) => {
  const { id, name } = event.target
  if (reg) {
    if (!reg.test(value) && value.length > 0) {
      setValue((prev) => ({
        ...prev,
        [id]: `${name}: 올바른 형식이 아닙니다.`,
      }))
    } else if (reg.test(value) || value.length === 0) {
      setValue((prev) => ({
        ...prev,
        [id]: '',
      }))
    }
  } else {
    if (password !== value && value.length > 0) {
      setValue((prev) => ({
        ...prev,
        [id]: `${name}: 비밀번호와 일치하지 않습니다.`,
      }))
    } else if (password === value || value.length === 0) {
      setValue((prev) => ({
        ...prev,
        [id]: '',
      }))
    }
  }
}

export default handleInputBlur
