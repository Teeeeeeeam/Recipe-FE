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
export async function getHomeRecipe(apiPath: string) {
  const { payload }: HomeRecipe = await requester({
    method: 'GET',
    url: apiPath,
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
export async function getHomePosting(apiPath: string, option: Options) {
  const { payload }: HomePosting = await requester({
    method: 'GET',
    url: apiPath,
    params: option,
  })
  return payload
}

// 레시피 페이지네이션
interface RecipesSearch {
  payload: {
    success: boolean
    message: string
    data: {
      content: Recipe[]
      empty: boolean
      first: boolean
      last: boolean
      number: number
      numberOfElements: number
      pageable: any
      size: number
      sort: any
      totlaElements: number
      totalPages: number
    }
  }
}
export async function getRecipes(apiPath: string, option: Options) {
  const { payload }: RecipesSearch = await requester({
    method: 'GET',
    url: apiPath,
    params: option,
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
export async function getRecipeDetail(apiPath: string, option: number) {
  const { payload }: RecipeDetail = await requester({
    method: 'GET',
    url: `${apiPath}${option}`,
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
export async function getUserPosting(apiPath: string) {
  const { payload }: UserPosting = await requester({
    method: 'GET',
    url: apiPath,
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
export async function getUserPostingDetail(apiPath: string, option: string) {
  const { payload }: UserPostingDetail = await requester({
    method: 'GET',
    url: `${apiPath}${option}`,
  })
  return payload
}

// 게시글 작성
export async function postUserWrite(apiPath: string, data: any, image: any) {
  const formData = new FormData()
  formData.append('userAddPostRequest', JSON.stringify(data))
  formData.append('file', image)

  const { payload } = await requester({
    method: 'POST',
    url: apiPath,
    data: formData,
  })
  return payload
}

// 게시글 수정
export interface UpdateData {
  postContent: string
  postTitle: string
  postServing: string
  postCookingTime: string
  postCookingLevel: string
  postPassword: string
}
export async function postUserMod(
  apiPath: string,
  data: UpdateData,
  img: File | null,
) {
  const formData = new FormData()
  if (img === null) {
    formData.append('userUpdateRequest', JSON.stringify(data))
  } else {
    formData.append('userUpdateRequest', JSON.stringify(data))
    formData.append('file', img)
  }
  const { payload } = await requester({
    method: 'POST',
    url: apiPath,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return payload
}

// 게시글 삭제
export async function postUserDel(apiPath: string, option: number) {
  const { payload } = await requester({
    method: 'Delete',
    url: `${apiPath}/${option}`,
  })
  return payload
}

// 게시글 관련 비밀번호 검증
export async function verifyPw(apiPath: string, option: any) {
  const { payload } = await requester({
    method: 'POST',
    url: apiPath,
    data: option,
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
export async function getComment(apiPath: string, option: any) {
  const { payload }: GetComment = await requester({
    method: 'GET',
    url: apiPath,
    params: option,
  })
  return payload
}

// 게시글 댓글 작성
interface PostCommentOptions {
  commentContent: string
  memberId: string
  postId: string | number
}
export async function postComment(apiPath: string, option: PostCommentOptions) {
  const { payload } = await requester({
    method: 'POST',
    url: apiPath,
    data: option,
  })
  return payload
}

// 게시글 댓글 수정
export async function modComment(apiPath: string, option: any) {
  const { payload } = await requester({
    method: 'PUT',
    url: apiPath,
    data: option,
  })
  return payload
}

// 게시글 댓글 삭제
interface deleteCommentOptions {
  memberId: string | number
  commentId: number
}
export async function deleteComment(
  apiPath: string,
  option: deleteCommentOptions,
) {
  const { payload } = await requester({
    method: 'Delete',
    url: apiPath,
    data: option,
  })
  return payload
}
