'use client'

import { getRecipeDetail, updateRecipe } from '@/api/admin-apis'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { CookStep } from '@/types/admin'
import useRecipeForm from '../../use-recipe-form'
import RecipeSelect from '@/app/admin/recipes/(recipe-management)/recipe-select'
import RecipeInput from '../../recipe-input'
import RecipeImageUploader from '../../recipe-image-uploader'
import { COOK_LEVEL, COOK_TIME, PEOPLE } from '../../constants'

const ModifyRecipe = () => {
  const [cookSteps, setCookSteps] = useState<CookStep[]>([])
  const [deleteCookStepsId, setDeleteCookStepsId] = useState<string[]>([])
  const [newCookSteps, setNewCookSteps] = useState<string[]>([])

  const {
    formData,
    setFormData,
    imgRef,
    previewImg,
    handleChange,
    handleArrayChange,
    handleAddArrayItem,
    handleDeleteArrayItem,
  } = useRecipeForm()

  const params = useParams()
  const recipeId = params.id
  const router = useRouter()

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      const res = await getRecipeDetail(recipeId as string)

      setFormData({
        imgFile: res.recipe.imageUrl,
        file: null,
        title: res.recipe.title,
        ingredients: [...res.ingredients],
        cookStep: [...res.cookSteps],
        people: res.recipe.people,
        cookTime: res.recipe.cookingTime,
        cookLevel: res.recipe.cookingLevel,
        cookIngredients: '',
        cookMethods: '',
        dishTypes: '',
      })
      setCookSteps(res.cookSteps)
    }

    fetchRecipeDetail()
  }, [])

  const handleAddNewCookStepsChange = (idx: number, value: string) => {
    const updatedNewCookSteps = [...newCookSteps]
    updatedNewCookSteps[idx] = value
    setNewCookSteps(updatedNewCookSteps)
  }
  const handleAddCookStepChange = (idx: number, value: string) => {
    const newCookSteps = [...cookSteps]
    newCookSteps[idx].cookSteps = value
    setCookSteps(newCookSteps)
  }

  const handleModifySusbmit = async () => {
    if (
      !formData.title ||
      !formData.cookLevel ||
      !formData.people ||
      !formData.ingredients.length ||
      !formData.cookTime
    ) {
      alert('모든 필드를 채워야 합니다.')
      return
    }
    if (confirm('레시피를 수정하시겠습니까?')) {
      await updateRecipe(
        Number(recipeId),
        formData.title,
        formData.cookLevel,
        formData.people,
        formData.ingredients,
        formData.cookTime,
        cookSteps,
        newCookSteps,
        deleteCookStepsId,
        formData.file ?? null,
      )

      alert('게시글이 수정되었습니다.')
      router.push('/admin/recipes')
    }
  }

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
            onClick={handleModifySusbmit}
            className="py-3 bg-blue-50 text-white rounded-md shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            <span>수정</span>
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
            onDeleteClick={(idx) => handleDeleteArrayItem('ingredients', idx)}
          />
          <div className="flex items-center gap-x-2 mt-4">
            <div className="text-gray-600">조리순서</div>
            <button
              onClick={() => setNewCookSteps((prev) => [...prev, ''])}
              className="p-1 bg-blue-50 rounded-full hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <Image
                src="/svg/plus.svg"
                alt={`조리순서 추가`}
                width={20}
                height={20}
                priority
              />
            </button>
          </div>
          <div className="mt-2 space-y-2">
            {cookSteps &&
              cookSteps.map((el, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <textarea
                    value={el.cookSteps}
                    onChange={(e) =>
                      handleAddCookStepChange(idx, e.target.value)
                    }
                    className="w-full py-2 px-4 bg-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                  <button
                    onClick={() =>
                      setNewCookSteps((prev) =>
                        prev.filter((_, index) => index !== idx),
                      )
                    }
                    className="p-2 rounded-full hover:bg-green-150 focus:outline-none focus:ring-2 focus:ring-red-300"
                  >
                    <Image
                      src={`/svg/close.svg`}
                      alt="delete-icon"
                      height={15}
                      width={15}
                      onClick={() => {
                        setCookSteps((prev) =>
                          prev.filter((_, index) => index !== idx),
                        )
                        setDeleteCookStepsId((prev) => [...prev, el.cookStepId])
                      }}
                      priority
                    />
                  </button>
                </div>
              ))}
          </div>
          <div className="mt-2 space-y-2">
            {newCookSteps &&
              newCookSteps.map((el, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <textarea
                    value={el}
                    onChange={(e) =>
                      handleAddNewCookStepsChange(idx, e.target.value)
                    }
                    className="w-full py-2 px-4 bg-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                  <button
                    onClick={() =>
                      setNewCookSteps((prev) =>
                        prev.filter((_, index) => index !== idx),
                      )
                    }
                    className="p-2 rounded-full hover:bg-green-150 focus:outline-none focus:ring-2 focus:ring-red-300"
                  >
                    <Image
                      src={`/svg/close.svg`}
                      alt="delete-icon"
                      height={15}
                      width={15}
                      priority
                    />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModifyRecipe
