import Image from 'next/image'
import Link from 'next/link'
import { RecipeForMain } from '@/types/recipe'

export default function RecipeFigure({ recipes, group }: RecipeForMain) {
  return (
    <>
      {recipes?.map((item) => {
        // group :boolean === true ? admin-recipe : user-recipe
        const thisPath =
          group === true
            ? `/list-page/main-recipes/${item.id}`
            : `/list-page/user-recipes/${item.id}`

        if (item.title) {
          return (
            <figure
              key={item.id}
              className="bg-[#222E50] rounded-lg border shadow-md max-w-xs md:max-w-none overflow-hidden py-3"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={500}
                height={500}
                className="h-56 lg:h-60 w-11/12 mx-auto rounded"
                priority
              />
              <figcaption className="w-11/12 mx-auto pt-3 text-gray-300">
                <span className="block text-sm text-primary text-right">
                  좋아요: {item.likeCount}
                </span>
                <dl>
                  <dt className="font-semibold text-xl leading-6 my-2">
                    {item.title}
                  </dt>
                  <dd className="paragraph-normal">{`${item.people}, ${item.cookingLevel}`}</dd>
                </dl>
                <Link className="mt-3 block" href={thisPath}>
                  자세히 보기
                </Link>
              </figcaption>
            </figure>
          )
        }
      })}
    </>
  )
}
export function UserRecipeFigure({ recipes }: any) {
  return (
    <>
      {recipes?.map((item: any) => {
        const createDate = item.create_at.slice(0, item.create_at.indexOf('T'))
        return (
          <figure
            key={item.id}
            className="bg-[#222E50] rounded-lg border shadow-md max-w-xs md:max-w-none overflow-hidden py-3"
          >
            <Image
              src={item.postImageUrl}
              alt={item.postTitle}
              width={500}
              height={500}
              className="h-56 lg:h-60 w-11/12 mx-auto rounded"
              priority
            />
            <figcaption className="w-11/12 mx-auto pt-3 text-gray-300">
              <span className="block text-sm text-primary text-right">
                {createDate}
              </span>
              <dl>
                <dt className="font-semibold text-xl leading-6 my-2">
                  {item.postTitle}
                </dt>
                <dd className="paragraph-normal">
                  {item.member.nickname}님 작성
                </dd>
              </dl>
              <Link
                className="mt-3 block"
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
