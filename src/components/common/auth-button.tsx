import React from 'react'

interface AuthButtonProps {
  type: 'submit' | 'button'
  children: React.ReactNode
  onClick?: () => void
}

const AuthButton = ({ type, children, onClick }: AuthButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <button
      type={type}
      className="w-full py-2 rounded-md text-white bg-green-100 hover:bg-green-150"
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export default AuthButton
