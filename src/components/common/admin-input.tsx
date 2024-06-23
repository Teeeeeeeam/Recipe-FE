import { Dispatch, SetStateAction } from 'react'

interface AdminInputProps {
  placeholder: string
  state: string
  setState: Dispatch<SetStateAction<string>>
  isBorder?: boolean
}

const AdminInput = ({
  placeholder,
  state,
  setState,
  isBorder = false,
}: AdminInputProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={state}
      onChange={(e) => setState(e.target.value)}
      className={`w-full py-2 pl-2 ${isBorder ? 'border-[1.5px]' : 'border-none'} border-l`}
    />
  )
}

export default AdminInput
