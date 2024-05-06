import { Dispatch, SetStateAction } from 'react'

interface InputProps {
  type: string
  placeholder: string
  state: string
  setState: Dispatch<SetStateAction<string>>
}

const AuthInput = ({ type, placeholder, state, setState }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={state}
      onChange={(e) => setState(e.target.value)}
      className="w-full py-3 pl-2 rounded-md"
      autoComplete="current-password"
    />
  )
}

export default AuthInput
