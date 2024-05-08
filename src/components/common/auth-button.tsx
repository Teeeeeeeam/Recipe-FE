import React from 'react'

interface AuthButtonProps {
  type: 'submit' | 'button'
  children: React.ReactNode
  onClick?: () => void
  isState?: boolean
}

const AuthButton = ({ type, children, onClick, isState }: AuthButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <button
      type={type}
      className="w-full p-2 rounded-md text-white bg-green-100 hover:bg-green-150 text-[12px]"
      onClick={handleClick}
      disabled={isState}
    >
      {children}
    </button>
  )
}

export default AuthButton
