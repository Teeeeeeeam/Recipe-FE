import React from 'react'

interface AuthButtonProps {
  type: 'submit' | 'button'
  children: React.ReactNode
}

const AuthButton = ({ type, children }: AuthButtonProps) => {
  return (
    <button
      type={type}
      className="w-full py-2 rounded-md text-white bg-green-100 hover:bg-green-150"
    >
      {children}
    </button>
  )
}

export default AuthButton
