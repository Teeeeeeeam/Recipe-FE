import {
  Comments,
  DetailRecipe,
  Options,
  Posting,
  PostingFigure,
  Recipe,
} from '@/types/recipe'
import axios from 'axios'
import requester from '.'

// 홈(레시피)
interface HomeRecipe {
  payload: {
    success: boolean
    message: string
    data: { recipe: Recipe[] }
  }
}
export async function getHomeRecipe() {
  const { payload }: HomeRecipe = await requester({
    method: 'GET',
    url: '/api/main/recipe',
  })
  return payload
}

// 홈(게시글)
interface HomePosting {
  payload: {
    success: boolean
    message: string
    data: {
      nextPage: boolean
      posts: PostingFigure[]
    }
  }
}
export async function getHomePosting(params: { size: number }) {
  const { payload }: HomePosting = await requester({
    method: 'GET',
    url: '/api/posts',
    params,
  })
  return payload
}

// 레시피 페이지네이션
interface RecipesSearch {
  payload: {
    success: boolean
    message: string
    data: {
      recipes: Recipe[] | []
      totlaElements: number
      totalPage: number
    }
  }
}
export async function getRecipes(params: Options) {
  const { payload }: RecipesSearch = await requester({
    method: 'GET',
    url: '/api/recipe/normal',
    params,
  })
  return payload
}

// 레시피 상세페이지
interface RecipeDetail extends Record<string, any> {
  payload: {
    success: boolean
    message: string
    data: DetailRecipe
  }
}
export async function getRecipeDetail(recipeId: number) {
  const { payload }: RecipeDetail = await requester({
    method: 'GET',
    url: `/api/recipe/${recipeId}`,
  })
  return payload
}

// 게시글 무한페이지
interface UserPosting {
  payload: {
    success: boolean
    message: string
    data: {
      nextPage: boolean
      posts: PostingFigure[]
    }
  }
}
export async function getUserPosting(params: any) {
  const { payload }: UserPosting = await requester({
    method: 'GET',
    url: '/api/posts',
    params,
  })
  return payload
}

// 게시글 상세페이지
interface UserPostingDetail {
  payload: {
    success: boolean
    message: string
    data: Posting
  }
}
export async function getUserPostingDetail(postId: number) {
  const { payload }: UserPostingDetail = await requester({
    method: 'GET',
    url: `/api/user/posts/${postId}`,
  })
  return payload
}

// 게시글 작성
interface UserAddPostRequest {
  writeReq: {
    postTitle: string
    postContent: string
    postCookingTime: string
    postCookingLevel: string
    postServing: string
    recipeId: number
    postPassword: string
  }
  writeFile: File
}
export async function postUserWrite(req: UserAddPostRequest) {
  const formData = new FormData()
  formData.append('userAddPostRequest', JSON.stringify(req.writeReq))
  formData.append('file', req.writeFile)

  const { payload } = await requester({
    method: 'POST',
    url: '/api/user/posts',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return payload
}

// 게시글 수정
export interface UserUpdateRequest {
  modReq: {
    postContent: string
    postTitle: string
    postServing: string
    postCookingTime: string
    postCookingLevel: string
    postPassword: string
  }
  modFile: File | null
}
export async function postUserMod(postId: number, req: UserUpdateRequest) {
  const formData = new FormData()
  if (req.modFile === null) {
    formData.append('userUpdateRequest', JSON.stringify(req.modReq))
  } else {
    formData.append('userUpdateRequest', JSON.stringify(req.modReq))
    formData.append('file', req.modFile)
  }
  const { payload } = await requester({
    method: 'POST',
    url: `/api/user/update/posts/${postId}`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return payload
}

// 게시글 삭제
export async function postUserDel(postId: number) {
  const { payload } = await requester({
    method: 'DELETE',
    url: `/api/user/posts/${postId}`,
  })
  return payload
}

// 게시글 관련 비밀번호 검증
export async function verifyPw(req: { password: string; postId: number }) {
  const { payload } = await requester({
    method: 'POST',
    url: `/api/user/valid/posts`,
    data: req,
  })
  return payload
}

// 게시글 댓글 조회
interface GetComment {
  payload: {
    data: {
      content: Comments[] | []
      empty: boolean
      first: boolean
      last: boolean
      number: number
      numberOfElements: number
      pageable: {
        offset: number
        pageNumber: number
        pageSize: number
        paged: boolean
        sort: {
          empty: boolean
          sorted: boolean
          unsorted: boolean
        }
      }
      size: number
      sort: {
        empty: boolean
        sorted: boolean
        unsorted: boolean
      }
      totalElements: number
      totalPages: number
    }
  }
}
export async function getComment(params: Options) {
  const { payload }: GetComment = await requester({
    method: 'GET',
    url: '/api/comments',
    params,
  })
  return payload
}

// 게시글 댓글 작성
interface CommentPostRequest {
  commentContent: string
  postId: number
}
export async function postComment(req: CommentPostRequest) {
  const { payload } = await requester({
    method: 'POST',
    url: '/api/user/comments',
    data: req,
  })
  return payload
}

// 게시글 댓글 수정
interface CommentModRequest {
  commentContent: string
  commentId: number
}
export async function modComment(req: CommentModRequest) {
  const { payload } = await requester({
    method: 'PUT',
    url: '/api/user/comments',
    data: req,
  })
  return payload
}

// 게시글 댓글 삭제
interface CommentDelRequest {
  commentId: number
}
export async function deleteComment(req: CommentDelRequest) {
  const { payload } = await requester({
    method: 'Delete',
    url: '/api/user/comments',
    data: req,
  })
  return payload
}
