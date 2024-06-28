'use client'
import Image from 'next/image'
import Link from 'next/link'
import { PostingFigure, Recipe } from '@/types/recipe'

interface RecipeFigureProps {
  recipes: Recipe[] | undefined
}
export function RecipeFigure({ recipes }: RecipeFigureProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2 md:px-8 md:pb-8">
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
                objectFit="cover"
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
    </div>
  )
}

interface PostingFigureProps {
  recipes: PostingFigure[] | undefined
}
export function UserPostingFigure({ recipes }: PostingFigureProps) {
  return (
    <>
      {/* {recipes?.map((item) => {
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
                {item.createdAt}
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
      })} */}
      {recipes?.map((item) => {
        return (
          <figure
            key={item.id}
            className="flex flex-col items-center rounded-lg border border-[#E0E0E0] shadow-md max-w-xs md:max-w-none overflow-hidden p-3"
          >
            <Image
              src={item.postImageUrl}
              alt={item.postTitle}
              width={500}
              height={500}
              className="h-40 w-full object-cover rounded mb-3"
              priority
            />
            <figcaption className="w-full text-left">
              <div className="flex justify-between items-center mb-2">
                <span className="block text-sm text-gray-500">
                  {item.createdAt}
                </span>
                <span className="block text-sm text-gray-500">
                  {item.member.nickname}
                </span>
              </div>
              <h3 className="font-semibold text-lg text-black mb-2">
                {item.postTitle}
              </h3>
              <Link
                className="block text-blue-500 font-semibold"
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
