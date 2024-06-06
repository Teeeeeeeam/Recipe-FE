'use client'

import { deletePosts, deleteRecipe } from '@/api/admin-apis'
import { PostList } from '@/types/admin'
import Link from 'next/link'
import { useState, forwardRef } from 'react'
import Comments from './comments'

interface PostListProps {
  posts: PostList[]
  deleteList: number[]
  handleCheckboxChange: (postId: number) => void
}

const PostList = forwardRef<HTMLDivElement, PostListProps>(
  ({ posts, deleteList, handleCheckboxChange }, ref) => {
    const [activeCommentId, setActiveCommentId] = useState<number | null>(null)

    const handleGetCommentClick = (id: number) => {
      if (activeCommentId) {
        setActiveCommentId(null)
      } else {
        setActiveCommentId((prevId) => (prevId === id ? null : id))
      }
    }

    const handleDeletePostsClick = async (id: number) => {
      if (confirm('해당 요리글을 삭제하시겠습니까?')) {
        try {
          await deletePosts([id])
        } catch (err) {
          console.log(err)
        }
      }
    }

    return (
      <div className="flex flex-col space-y-2 mt-2">
        {posts &&
          posts.map((el) => (
            <div key={el.id}>
              <ul className="relative grid grid-cols-[1fr_2fr_2fr_1fr_2fr_2fr_2fr] items-center text-[12px] lg:text-[16px] text-center py-4 bg-navy-100">
                <li>
                  <input
                    type="checkbox"
                    checked={deleteList.includes(el.id)}
                    onChange={() => handleCheckboxChange(el.id)}
                    className="cursor-pointer"
                  />
                </li>
                <li>{el.id}</li>
                <Link href={`/list-page/user-recipes/${el.id}`}>
                  <li className="cursor-pointer hover:text-green-150">
                    {el.postTitle}
                  </li>
                </Link>
                <li>{el.member.loginId}</li>
                <Link href={`/list-page/main-recipes/${el.recipe.id}`}>
                  <li className="hover:text-green-150">{el.recipe.title}</li>
                </Link>
                <li>{el.create_at.slice(0, 10)}</li>
                <li className="space-x-1">
                  <button onClick={() => handleGetCommentClick(el.id)}>
                    댓글
                  </button>
                  <span>/</span>
                  <button onClick={() => handleDeletePostsClick(el.id)}>
                    삭제
                  </button>
                </li>
              </ul>
              {activeCommentId === el.id && <Comments id={el.id} />}
            </div>
          ))}
        <div ref={ref}></div>
      </div>
    )
  },
)

export default PostList
