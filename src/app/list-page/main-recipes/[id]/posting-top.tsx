import { TopPosting, getTopPosting } from '@/api/recipe-apis'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface PostingTopProps {
  id: number
}
export default function PostingTop({ id }: PostingTopProps) {
  const [topPosting, setTopPosting] = useState<TopPosting[]>([])
  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    try {
      const option = {
        recipeId: id,
      }
      const result = await getTopPosting(option)
      setTopPosting(result.data.post)
    } catch (error) {
      console.log(error)
    }
  }

  const newParams = new URLSearchParams()
  newParams.append('recipeid', String(id))
  const newUrl = `/list-page/user-recipes?${newParams.toString()}`

  return (
    <section className="p-3 mt-3">
      <div className="flex justify-between items-center pb-3 mb-5 border-b">
        <h4 className="text-2xl">베스트 후기</h4>
        <Link href={newUrl}>더보기</Link>
      </div>
      <div className=" grid md:gap-10 md:grid-cols-4 gap-5 grid-cols-2">
        {topPosting.map((item, index) => {
          return (
            <Link key={item.id} href={`/list-page/user-recipes/${item.id}`}>
              <figure className="flex flex-col overflow-hidden rounded shadow-md">
                <Image
                  src={item.postImageUrl}
                  alt={item.postTitle}
                  width={500}
                  height={500}
                  className="md:h-56 w-full"
                />
                <figcaption className="p-4">
                  <p className="mb-1 flex justify-between text-xs font-medium text-gray-600">
                    <span>{item.member.nickname}</span>
                    <span>좋아요: {item.postLikeCount}</span>
                  </p>
                  <p className="font-medium">{item.postTitle}</p>
                </figcaption>
              </figure>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
