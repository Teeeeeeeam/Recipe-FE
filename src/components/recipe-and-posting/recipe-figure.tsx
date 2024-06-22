'use client'
import Image from 'next/image'
import Link from 'next/link'
import { PostingFigure, Recipe } from '@/types/recipe'

interface RecipeFigureProps {
  recipes: Recipe[] | undefined
}
export function RecipeFigure({ recipes }: RecipeFigureProps) {
  return (
    <>
      {recipes?.map((item) => {
        return (
          <figure
            key={item.id}
            className="rounded-lg border max-h-[400px] border-[#C6C6C6] shadow-md max-w-xs md:max-w-none overflow-hidden py-3"
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={500}
              height={500}
              className="h-56 lg:h-60 w-11/12 mx-auto rounded border border-[#C6C6C6]"
              priority
            />
            <figcaption className="w-11/12 mx-auto pt-3 text-gray-300">
              <span className="block text-sm text-primary text-right text-[#77D8B6]">
                좋아요: {item.likeCount}
              </span>
              <dl>
                <dt className="font-semibold text-xl leading-6 my-2 text-black">
                  {item.title}
                </dt>
                <dd className="paragraph-normal text-[#9B9B9B]">{`${item.people}, ${item.cookingLevel}`}</dd>
              </dl>
              <Link
                className="mt-3 block text-[#1D1D1D]"
                href={`/list-page/main-recipes/${item.id}`}
              >
                자세히 보기
              </Link>
            </figcaption>
          </figure>
        )
      })}
    </>
  )
}

interface PostingFigureProps {
  recipes: PostingFigure[] | undefined
}
export function UserPostingFigure({ recipes }: PostingFigureProps) {
  return (
    <>
      {recipes?.map((item) => {
        const createDate = item.createdAt.slice(0, item.createdAt.indexOf('T'))
        return (
          <figure
            key={item.id}
            className="rounded-lg border border-[#C6C6C6] shadow-md max-w-xs md:max-w-none overflow-hidden py-3"
          >
            <Image
              src={item.postImageUrl}
              alt={item.postTitle}
              width={500}
              height={500}
              className="h-56 lg:h-60 w-11/12 mx-auto rounded border border-[#C6C6C6]"
              priority
            />
            <figcaption className="w-11/12 mx-auto pt-3 text-gray-300">
              <span className="block text-sm text-primary text-right text-[#77D8B6]">
                {createDate}
              </span>
              <dl>
                <dt className="font-semibold text-xl leading-6 my-2 text-black">
                  {item.postTitle}
                </dt>
                <dd className="paragraph-normal text-[#9B9B9B]">
                  {item.member.nickname}님 작성
                </dd>
              </dl>
              <Link
                className="mt-3 block text-[#1D1D1D]"
                href={`/list-page/user-recipes/${item.id}`}
              >
                자세히 보기
              </Link>
            </figcaption>
          </figure>
        )
      })}
    </>
  )
}
