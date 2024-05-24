'use client'

import { fetchGetMethodParamsHeader } from '@/api/recipe-apis'
import { getLocalStorage } from '@/lib/local-storage'
import { recipeId } from '@/store/mod-userRecipe-slice'
import { ThreeCookInfo } from '@/types/recipe'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export interface DetailUserRecipe extends Record<string, any> {
  create_at: string
  member: { [nickname: string]: string }
  postContent: string
  postCookingLevel: string
  psotCookingTime: string
  postImageUrl: string
  postLikeCount: number
  postServing: string
  postTitle: string
}

export default function RecipeDetailUser() {
  const [thisInfo, setThisInfo] = useState<DetailUserRecipe | null>(null)
  const [thisInfoCook, setThisInfoCook] = useState<ThreeCookInfo[] | null>(null)

  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    const token = getLocalStorage('accessToken')
    const thisId = Number(params.id)
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }
    async function getData() {
      const result = await fetchGetMethodParamsHeader(
        `/api/user/posts/${thisId}`,
        config,
      )
      function createThree(str1: string, str2: string, str3: string) {
        return {
          title: str1,
          data: result.data.post[str2],
          imgUrl: `/svg/${str3}.svg`,
        }
      }
      const resultCook = [
        createThree('postServing', result.data.post.postServing, 'people'),
        createThree(
          'postCookingTime',
          result.data.post.postCookingTime,
          'timer',
        ),
        createThree(
          'postCookingLevel',
          result.data.post.postCookingLevel,
          'stars',
        ),
      ]
      setThisInfo(result.data.post)
      setThisInfoCook(resultCook)
    }
    getData()
  }, [])

  return (
    thisInfo && (
      <article className="detail-wrap py-5 relative">
        <h3 className="text-center text-4xl mb-5">title</h3>
        <section className="detail-info w-full">
          <div className="detail-top flex justify-center mb-5">
            <Image
              src={thisInfo.postImageUrl}
              alt={thisInfo.postTitle}
              width={300}
              height={300}
              className="rounded-2xl"
            />
          </div>
          <div className="detail-bottom">
            <ul className="flex justify-between w-[70%] mx-auto mb-3">
              {thisInfoCook?.map((cook, index) => {
                return (
                  <li key={cook.title} className="flex flex-col items-center">
                    <Image
                      src={cook.imgUrl}
                      alt={cook.title}
                      width={50}
                      height={50}
                    />
                    <span>{thisInfo[cook.title]}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
        <section className="detail-step w-full">
          <div className="flex flex-wrap flex-col py-2 border-t border-[#000]">
            <h4 className="text-2xl mb-3">내용</h4>
            <p>{thisInfo.postContent}</p>
          </div>
        </section>
        <section>댓글</section>
        <aside className="absolute py-5 top-0 right-0 w-1/12">
          <ul className="flex flex-col items-center">
            <li className="mb-2 py-2 w-full text-center bg-gray-400 rounded-lg">
              <Link
                href="/list-page/user-recipes/modification"
                onClick={() => dispatch(recipeId(thisInfo))}
                className="block w-full"
              >
                게시물 수정
              </Link>
            </li>
            <li className="cursor-pointer py-2 w-full text-center bg-gray-400 rounded-lg">
              게시물 삭제
            </li>
            <li className="flex mb-2 py-2 w-full bg-gray-400 items-center justify-center rounded-lg cursor-pointer">
              <Image src="/svg/heart.svg" alt="좋아요" width={20} height={15} />
              {thisInfo.postLikeCount}
            </li>
          </ul>
        </aside>
      </article>
    )
  )
}
