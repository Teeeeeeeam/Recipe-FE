'use client'
import { detailRecipeHandler } from '@/api/recipe-apis'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DetailRecipe, ThreeCookInfo } from '@/types/recipe'

export default function RecipeDetailMain() {
  const [thisInfo, setThisInfo] = useState<DetailRecipe>()
  const [thisInfoCook, setThisInfoCook] = useState<ThreeCookInfo[]>()
  const params = useParams()
  const thisId = params.id
  useEffect(() => {
    getData()
  }, [])
  async function getData() {
    const result = await detailRecipeHandler(`/api/recipe/${thisId}`)
    const resultCook = [
      createThree('people', 'people'),
      createThree('cookingTime', 'timer'),
      createThree('cookingLevel', 'stars'),
    ]
    function createThree(str1: string, str2: string) {
      return {
        title: str1,
        data: result.data.recipe[str1],
        imgUrl: `/svg/${str2}.svg`,
      }
    }
    setThisInfo(result.data)
    setThisInfoCook(resultCook)
  }
  return (
    thisInfo && (
      <article className="detail-wrap py-5">
        <h3 className="text-center text-4xl mb-5">{thisInfo.recipe.title}</h3>
        <section className="detail-info w-full">
          <div className="detail-top flex justify-center mb-5">
            <Image
              src={thisInfo.recipe.imageUrl}
              alt={thisInfo.recipe.title}
              width={500}
              height={500}
              className="rounded-2xl"
            />
          </div>
          <div className="detail-bottom">
            <dl className="flex flex-wrap items-center justify-center mb-5">
              <dt className="mr-3 text-2xl">요리 재료</dt>
              {thisInfo.ingredients.map((ingredient, index) => {
                return (
                  <dd
                    key={index}
                    className="mx-1 px-2 border border-[#000] box-border rounded-xl"
                  >
                    {ingredient}
                  </dd>
                )
              })}
            </dl>
            <ul className="flex justify-between w-[70%] mx-auto mb-3">
              {thisInfoCook?.map((cook) => {
                return (
                  <li key={cook.title} className="flex flex-col items-center">
                    <Image
                      src={cook.imgUrl}
                      alt={cook.title}
                      width={50}
                      height={50}
                    />
                    <span>{thisInfo.recipe[cook.title]}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
        <section className="detail-step flex flex-wrap flex-col py-2 border-t border-[#000]">
          <h4 className="text-2xl mb-3">조리순서</h4>
          {thisInfo.cookStep.map((step, index) => {
            return (
              <p key={step.cook_step_id} className="mb-3">
                {index + 1}.&nbsp;{step.cook_steps}
              </p>
            )
          })}
        </section>
      </article>
    )
  )
}
