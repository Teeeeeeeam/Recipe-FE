interface RaidoButtonProps {
  selected: boolean
  onClick?: () => void
}

const RadioButton = ({ selected, onClick }: RaidoButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-full h-6 w-6 border border-green-100 flex items-center justify-center cursor-pointer transition-colors`}
    >
      {selected && <div className="p-[8px] rounded-full bg-green-100"></div>}
    </div>
  )
}

interface RadioButtonGroupProps {
  options: string[]
  selectedOption: string | null
  onOptionChange: (option: string | null) => void
}

const RadioButtonGroup = ({
  options,
  selectedOption,
  onOptionChange,
}: RadioButtonGroupProps) => {
  return (
    <div className="flex gap-x-2">
      {options.map((option) => (
        <div
          key={option}
          className="flex items-center gap-x-1 cursor-pointer"
          onClick={() =>
            onOptionChange(selectedOption === option ? null : option)
          }
        >
          <RadioButton
            selected={selectedOption === option}
            onClick={() =>
              onOptionChange(selectedOption === option ? null : option)
            }
          />
          <div>{option}</div>
        </div>
      ))}
    </div>
  )
}

export { RadioButton, RadioButtonGroup }
