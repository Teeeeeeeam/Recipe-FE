'use client'
import { fetchGetMethodParams } from '@/api/recipe-apis'
import { useEffect, useState } from 'react'
import { UserRecipeFigure } from '@/components/recipeFigure'

export default function UserRecipes() {
  const [recipes, setRecipes] = useState<any>()
  const options = {
    page: 0,
    size: 10,
    sort: [''].join(),
  }
  useEffect(() => {
    async function getData() {
      const result = await fetchGetMethodParams('/api/posts', options)
      setRecipes(result.posts)
    }
    getData()
  }, [])

  return (
    <div className="userRecipe-wrap">
      <div className="p-8 grid justify-center md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7 my-10">
        <UserRecipeFigure recipes={recipes} />
      </div>
    </div>
  )
}
