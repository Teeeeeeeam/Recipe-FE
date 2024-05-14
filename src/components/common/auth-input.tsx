import { Dispatch, SetStateAction } from 'react'

interface AuthInputProps {
  type: string
  placeholder: string
  state: string
  setState: Dispatch<SetStateAction<string>>
  validation?: string
  id?: string
  name?: string
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

const AuthInput = ({
  id,
  name,
  type,
  placeholder,
  validation,
  state,
  setState,
  onBlur,
}: AuthInputProps) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={state}
      onChange={(e) => setState(e.target.value)}
      onBlur={onBlur}
      className={`w-full py-2 pl-2 rounded-md ${validation && validation.length > 0 && 'border-red-50'}`}
      autoComplete="current-password"
    />
  )
}

export default AuthInput
