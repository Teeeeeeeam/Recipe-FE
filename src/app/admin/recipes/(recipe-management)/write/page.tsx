'use client'
import useRecipeForm from '../use-recipe-form'
import RecipeImageUploader from '../recipe-image-uploader'
import RecipeInput from '../recipe-input'
import RecipeSelect from '@/components/common/recipe-select'
import { COOK_LEVEL, COOK_TIME, PEOPLE } from '../constants'

const WriteRecipe = () => {
  const {
    formData,
    imgRef,
    previewImg,
    handleChange,
    handleArrayChange,
    handleAddArrayItem,
    handleDeleteArrayItem,
    handleWriteSubmit,
  } = useRecipeForm()

  return (
    <div className="p-4 bg-gray-50 h-full">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-[5fr_1fr] justify-between items-center gap-x-4 mb-6">
          <input
            placeholder="레시피 이름 입력"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full py-3 px-4 bg-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <button
            type="button"
            onClick={handleWriteSubmit}
            className="py-3 bg-blue-50 text-white rounded-md shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            <span>등록</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <RecipeImageUploader
              imgFile={formData.imgFile}
              previewImg={previewImg}
              imgRef={imgRef}
            />
          </div>
          <div className="flex flex-col space-y-6">
            <RecipeSelect
              label="인분"
              value={formData.people}
              onChange={(value) => handleChange('people', value)}
              options={PEOPLE}
            />
            <RecipeSelect
              label="요리시간"
              value={formData.cookTime}
              onChange={(value) => handleChange('cookTime', value)}
              options={COOK_TIME}
            />
            <RecipeSelect
              label="난이도"
              value={formData.cookLevel}
              onChange={(value) => handleChange('cookLevel', value)}
              options={COOK_LEVEL}
            />
          </div>
        </div>
        <div className="mt-4">
          <RecipeInput
            label="요리 재료"
            values={formData.ingredients}
            onAddClick={() => handleAddArrayItem('ingredients')}
            onChange={(idx, value) =>
              handleArrayChange('ingredients', idx, value)
            }
            onDeleteClick={(idx) => handleDeleteArrayItem('cookStep', idx)}
          />
          <RecipeInput
            label="조리 순서"
            values={formData.cookStep as string[]}
            onAddClick={() => handleAddArrayItem('cookStep')}
            onChange={(idx, value) => handleArrayChange('cookStep', idx, value)}
            onDeleteClick={(idx) => handleDeleteArrayItem('cookStep', idx)}
          />
        </div>
      </div>
    </div>
  )
}

export default WriteRecipe
