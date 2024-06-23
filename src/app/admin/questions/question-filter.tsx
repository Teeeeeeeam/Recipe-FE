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
    <div className="flex flex-col bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold pl-4 pt-4">문의사항</h2>
      <div className="flex gap-x-6 p-4">
        <div className="flex-1 border p-4 rounded-md shadow-sm">
          <h3 className="mb-2 text-lg font-semibold">카테고리</h3>
          <RadioButtonGroup
            options={['일반', '계정']}
            selectedOption={selectedCategory}
            onOptionChange={setSelectedCategory}
          />
        </div>
        <div className="flex-1 border p-4 rounded-md shadow-sm">
          <h3 className="mb-2 text-lg font-semibold">상태</h3>
          <RadioButtonGroup
            options={['미완료', '완료']}
            selectedOption={selectedStatus}
            onOptionChange={setSelectedStatus}
          />
        </div>
      </div>
    </div>
  )
}

export default QuestionFilter
