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
            className="flex flex-col items-center rounded-lg border border-gray-200 shadow-md overflow-hidden"
          >
            <div className="relative w-full pt-[100%]">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
            <figcaption className="p-4 w-full">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <span className="text-sm text-green-600 font-semibold">
                  좋아요: {item.likeCount.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">
                  {item.people}, {item.cookingLevel}
                </span>
              </div>
              <h3 className="font-semibold text-lg text-black mb-2">
                {item.title}
              </h3>
              <Link href={`/list-page/main-recipes/${item.id}`}>
                <p className="text-blue-500 font-semibold">자세히 보기</p>
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
        return (
          <figure
            key={item.id}
            className="flex flex-col items-center rounded-lg border border-gray-200 shadow-md overflow-hidden"
          >
            <div className="relative md:w-full pt-[100%]">
              <Image
                src={item.postImageUrl}
                alt={item.postTitle}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
            <figcaption className="p-4 w-full">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <span className="text-sm text-green-600 font-semibold">
                  {item.member.nickname}
                </span>
                <span className="text-sm text-gray-500">{item.createdAt}</span>
              </div>
              <h3 className="font-semibold text-lg text-black mb-2">
                {item.postTitle}
              </h3>
              <Link href={`/list-page/user-recipes/${item.id}`}>
                <p className="text-blue-500 font-semibold">자세히 보기</p>
              </Link>
            </figcaption>
          </figure>
        )
      })}
    </>
  )
}
