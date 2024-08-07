import { useState, useRef, ChangeEvent } from 'react'
import { postRecipe, updateRecipe } from '@/api/admin-apis'
import { useRouter } from 'next/navigation'
import { CookStep } from '@/types/admin'

interface FormData {
  imgFile: string
  file: File | null
  title: string
  ingredients: string[]
  cookStep: string[] | CookStep[]
  people: string
  cookTime: string
  cookLevel: string
  cookIngredients: string
  cookMethods: string
  dishTypes: string
}

const useRecipeForm = () => {
  const [formData, setFormData] = useState<FormData>({
    imgFile: '',
    file: null as File | null,
    title: '',
    ingredients: [''],
    cookStep: [''],
    people: '',
    cookTime: '',
    cookLevel: '',
    cookIngredients: '',
    cookMethods: '',
    dishTypes: '',
  })

  const imgRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const previewImg = () => {
    if (imgRef.current && imgRef.current.files) {
      const selectedFile = imgRef.current.files[0]

      setFormData((prev) => ({ ...prev, file: selectedFile }))
      if (selectedFile) {
        const reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setFormData((prev) => ({
              ...prev,
              imgFile: reader.result as string,
            }))
          }
        }
      }
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (
    field: keyof Pick<FormData, 'ingredients' | 'cookStep'>,
    index: number,
    value: string,
  ) => {
    setFormData((prev) => {
      const newArray = [...prev[field]]
      newArray[index] = value
      return { ...prev, [field]: newArray }
    })
  }

  const handleAddArrayItem = (
    field: keyof Pick<FormData, 'ingredients' | 'cookStep'>,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ''] }))
  }

  const handleDeleteArrayItem = (
    field: keyof Pick<typeof formData, 'ingredients' | 'cookStep'>,
    index: number,
  ) => {
    setFormData((prev) => {
      const newArray = [...formData[field]]
      newArray.splice(index, 1)
      return { ...prev, [field]: newArray }
    })
  }

  const handleWriteSubmit = async () => {
    if (
      !formData.title ||
      !formData.cookLevel ||
      !formData.people ||
      !formData.ingredients ||
      !formData.cookTime ||
      !formData.cookStep ||
      !formData.file ||
      !formData.cookIngredients ||
      !formData.cookMethods ||
      !formData.dishTypes
    ) {
      alert('빈 칸이 없는지 확인해주세요')
    } else if (formData.file) {
      if (confirm('게시글을 등록하시겠습니까?')) {
        await postRecipe(
          formData.title,
          formData.cookLevel,
          formData.people,
          formData.ingredients,
          formData.cookTime,
          formData.cookStep as string[],
          formData.file,
          formData.cookIngredients,
          formData.cookMethods,
          formData.dishTypes,
        )
        router.push('/admin/recipes')
      }
    } else {
      console.log('사진 필수')
    }
  }

  return {
    formData,
    setFormData,
    imgRef,
    previewImg,
    handleChange,
    handleArrayChange,
    handleAddArrayItem,
    handleDeleteArrayItem,
    handleWriteSubmit,
  }
}

export default useRecipeForm
