import { RadioButtonGroup } from '@/components/common/radio-button'

interface QuestionFilterProps {
  selectedCategory: string | null
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>
  selectedStatus: string | null
  setSelectedStatus: React.Dispatch<React.SetStateAction<string | null>>
}

const QuestionFilter = ({
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
}: QuestionFilterProps) => {
  return (
    <div className="flex gap-x-4">
      <div className="border p-2">
        <RadioButtonGroup
          options={['일반', '계정']}
          selectedOption={selectedCategory}
          onOptionChange={setSelectedCategory}
        />
      </div>
      <div className="border p-2">
        <RadioButtonGroup
          options={['미완료', '완료']}
          selectedOption={selectedStatus}
          onOptionChange={setSelectedStatus}
        />
      </div>
    </div>
  )
}

export default QuestionFilter
