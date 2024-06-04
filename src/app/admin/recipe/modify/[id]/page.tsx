'use client'

import { getDetailRecipe, updateRecipe } from '@/api/admin-apis'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { postRecipe } from '@/api/admin-apis'
import RecipeFormInput from '@/components/common/recipe-form-input'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { CookStep } from '@/types/admin'

const ModifyRecipe = () => {
  const [imgFile, setImgFile] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const imgRef = useRef<HTMLInputElement>(null)
  const [ingredients, setIngredients] = useState<string[]>([''])
  const [title, setTitle] = useState('')
  const [cookStep, setCookStep] = useState<CookStep[]>([])
  const [people, setPeople] = useState('')
  const [cookTime, setCookTime] = useState('')
  const [cookLevel, setCookLevel] = useState('')

  const params = useParams()
  const recipeId = params.id

  useEffect(() => {
    const getData = async () => {
      const res = await getDetailRecipe(recipeId as string)
      setImgFile(res.recipe.imageUrl)
      setIngredients(res.ingredients)
      setTitle(res.recipe.title)
      setCookLevel(res.recipe.cookingLevel)
      setCookTime(res.recipe.cookingTime)
      setPeople(res.recipe.people)
      setCookStep([...res.cookStep])
    }
    getData()
  }, [])
  console.log(imgFile)
  const previewImg = () => {
    if (imgRef.current && imgRef.current.files) {
      const selectedFile = imgRef.current.files[0]
      setFile(selectedFile)
      if (selectedFile) {
        const reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setImgFile(reader.result)
          }
        }
      }
    }
  }
  const handleAddIngredientsClick = () => {
    setIngredients((prev) => [...prev, ''])
  }
  const handleAddIngredientsChange = (idx: number, value: string) => {
    const newIngredients = [...ingredients]
    newIngredients[idx] = value
    setIngredients(newIngredients)
  }
  const handleAddCookStepChange = (idx: number, value: string) => {
    const newIngredients = [...cookStep]
    newIngredients[idx].cook_steps = value
    setCookStep(newIngredients)
  }
  //이미지 파일 수정 해야됨
  const handleModifyClick = async () => {
    // if (file) {
    //   const res = await updateRecipeRecipe(
    //     title,
    //     cookLevel,
    //     people,
    //     ingredients,
    //     cookTime,
    //     cookStep,
    //     file,
    //   )
    //   console.log(res)
    // }
  }
  return (
    <div className="space-y-10">
      <div className="flex justify-between text-center gap-x-2 text-white">
        <input
          placeholder="레시피 이름 입력"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="max-w-[360px] w-full py-3 pl-2 bg-green-100 rounded-md"
        />
        <button
          type="button"
          onClick={handleModifyClick}
          className="px-6 py-3 bg-green-100 hover:bg-green-150 rounded-md"
        >
          수정
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-4">
        <div className="space-y-2">
          <div className="w-[100px] py-1 text-center bg-navy-100 rounded-full text-white">
            이미지 선택
          </div>
          <div className="flex items-center justify-center w-full h-[160px] bcookStep">
            <Image
              src={imgFile ? imgFile : `/svg/img-box.svg`}
              alt="preview-img"
              width={160}
              height={160}
              className="w-auto h-auto"
              priority
            />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={imgRef}
            onChange={previewImg}
            className="w-full"
          />
        </div>
        <div className="flex flex-col items-center justify-center text-white gap-y-2">
          <div className="flex gap-x-2">
            <div className="w-[100px] py-1 text-center bg-green-100 rounded-full">
              인분
            </div>
            <RecipeFormInput value={people} onChange={setPeople} />
          </div>
          <div className="flex gap-x-2">
            <div className="w-[100px] py-1 text-center bg-green-100 rounded-full">
              요리시간
            </div>
            <RecipeFormInput value={cookTime} onChange={setCookTime} />
          </div>
          <div className="flex gap-x-2">
            <div className="w-[100px] py-1 text-center bg-green-100 rounded-full">
              난이도
            </div>
            <RecipeFormInput value={cookLevel} onChange={setCookLevel} />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex gap-2">
          <div className="w-[100px] py-1 text-center bg-navy-100 rounded-full text-white">
            요리 재료
          </div>
          <button onClick={handleAddIngredientsClick}>
            <Image
              src="/svg/plus.svg"
              alt="재료추가"
              width={30}
              height={30}
              className="bg-navy-100 rounded-full transition-transform hover:scale-110"
              priority
            />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {ingredients &&
            ingredients.map((el, idx) => (
              <input
                key={idx}
                value={el}
                onChange={(e) =>
                  handleAddIngredientsChange(idx, e.target.value)
                }
                className="min-w-[100px] py-1 pl-4 bg-green-100 rounded-sm text-white"
              />
            ))}
        </div>
      </div>
      <div className="text-white space-y-2">
        <div className="flex gap-x-2">
          <div className="w-[100px] py-1 text-center bg-navy-100 rounded-full">
            조리 순서
          </div>
          <button
            onClick={() => setCookStep((prev) => [...prev, { cook_steps: '' }])}
          >
            <Image
              src="/svg/plus.svg"
              alt="조리추가"
              width={30}
              height={30}
              className="bg-navy-100 rounded-full transition-transform hover:scale-110"
              priority
            />
          </button>
        </div>
        {cookStep &&
          cookStep.map((el, idx) => (
            <textarea
              key={idx}
              value={el.cook_steps}
              onChange={(e) => handleAddCookStepChange(idx, e.target.value)}
              className="w-full py-1 px-2 bg-green-100 rounded-sm text-white"
            />
          ))}
      </div>
    </div>
  )
}

export default ModifyRecipe
