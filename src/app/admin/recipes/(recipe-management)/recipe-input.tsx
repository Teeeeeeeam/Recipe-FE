import { CookStep } from '@/types/admin'
import Image from 'next/image'

interface RecipeInputProps {
  label: string
  onAddClick: () => void
  onDeleteClick: (idx: number) => void
  onChange: (idx: number, value: string) => void
  values?: string[]
  cookSteps?: CookStep[]
  newCookSteps?: string[]
}

const RecipeInput = ({
  label,
  values,
  onAddClick,
  onDeleteClick,
  onChange,
  cookSteps,
  newCookSteps,
}: RecipeInputProps) => {
  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center gap-x-2">
        <div className="text-gray-600">{label}</div>
        <button
          onClick={onAddClick}
          className="p-1 bg-blue-50 rounded-full hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          <Image
            src="/svg/plus.svg"
            alt={`${label} 추가`}
            width={20}
            height={20}
            priority
          />
        </button>
      </div>
      <div className="space-y-2">
        {cookSteps
          ? cookSteps.map((el, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <textarea
                  value={el.cookSteps}
                  onChange={(e) => onChange(idx, e.target.value)}
                  className="w-full py-2 px-4 bg-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-300"
                />
                <button
                  onClick={() => onDeleteClick(idx)}
                  className="p-2 rounded-full hover:bg-green-150 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  <Image
                    src={`/svg/close.svg`}
                    alt={`Delete ${label}`}
                    width={15}
                    height={15}
                  />
                </button>
              </div>
            ))
          : values &&
            values.map((el, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <textarea
                  value={el}
                  onChange={(e) => onChange(idx, e.target.value)}
                  className="w-full py-2 px-4 bg-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-300"
                />
                <button
                  onClick={() => onDeleteClick(idx)}
                  className="p-2 rounded-full hover:bg-green-150 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  <Image
                    src={`/svg/close.svg`}
                    alt={`Delete ${label}`}
                    width={15}
                    height={15}
                  />
                </button>
              </div>
            ))}
      </div>
    </div>
  )
}

export default RecipeInput
