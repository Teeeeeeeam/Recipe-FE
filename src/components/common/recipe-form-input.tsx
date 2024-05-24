import React from 'react'

interface RecipeNameInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  width?: string
}

const RecipeFormInput = ({
  value,
  onChange,
  placeholder,
  width,
}: RecipeNameInputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${width ? width : 'w-[140px]'} py-2 pl-2 bg-green-100 rounded-sm text-white border-none`}
    />
  )
}

export default RecipeFormInput
