interface CategorySelectorProps {
  label: string
  options: { label: string; value: string }[]
  selectedValue: string[]
  onClick: (value: string) => void
}

const CategorySelector = ({
  label,
  options,
  selectedValue,
  onClick,
}: CategorySelectorProps) => {
  return (
    <div className="flex border-y text-[12px] md:text-[14px]">
      <div className="flex-shrink-0 flex w-[54px] md:w-[60px] h-auto items-center justify-center font-smibold border-r p-2 text-blue-50">
        <span>{label}</span>
      </div>
      <div className="flex flex-wrap gap-1 md:gap-2 p-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onClick(option.value)}
            className={`px-2 py-1 rounded-full ${selectedValue.includes(option.value) ? 'bg-blue-50 text-white' : 'hover:bg-blue-200'}`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategorySelector
