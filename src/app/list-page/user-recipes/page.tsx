'use client'
import { getUserPosting } from '@/api/recipe-apis'
import { useEffect, useState } from 'react'
import { UserPostingFigure } from '@/components/recipeFigure'
import { PostingFigure } from '@/types/recipe'

export default function UserRecipes() {
  const [recipes, setRecipes] = useState<PostingFigure[]>([])
  const options = {
    page: 0,
    size: 10,
    sort: [''].join(),
  }
  useEffect(() => {
    getData()
  }, [])
  async function getData() {
    try {
      const result = await getUserPosting('/api/posts', options)
      console.log(result)
      setRecipes(result.posts)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="userRecipe-wrap">
      <div className="p-8 grid justify-center md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7 my-10">
        <UserPostingFigure recipes={recipes} />
      </div>
    </div>
  )
}
