import React from 'react'

const CustomCheckbox = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="checkbox"
          className="custom-checkbox hidden"
        />
        <label
          htmlFor="checkbox"
          className="relative inline-block w-5 h-5  border-2 border-gray-300 rounded cursor-pointer transition-colors duration-300"
        ></label>
      </div>
      <style jsx>{`
        .custom-checkbox:checked + label {
          @apply bg-blue-500 border-blue-500;
        }

        .custom-checkbox:checked + label::after {
          content: '';
          @apply absolute top-1 left-1 w-2 h-4 border-white border-r-2 border-b-2 transform rotate-45;
        }

        .custom-checkbox + label:hover {
          @apply border-gray-400;
        }

        .custom-checkbox:focus + label {
          @apply outline-none ring-2 ring-blue-500 ring-offset-2;
        }
      `}</style>
    </div>
  )
}

export default CustomCheckbox
