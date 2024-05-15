import { Dispatch, SetStateAction } from 'react'

interface AdminInputProps {
  placeholder: string
  state: string
  setState: Dispatch<SetStateAction<string>>
}

const AdminInput = ({ placeholder, state, setState }: AdminInputProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={state}
      onChange={(e) => setState(e.target.value)}
      className="w-full py-2 pl-2 border-none border-l"
    />
  )
}

export default AdminInput
