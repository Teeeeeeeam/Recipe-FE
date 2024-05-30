import { UpdateData } from '@/app/list-page/user-recipes/modification/page'
import {
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
    nextPage: boolean
    posts: PostingFigure[]
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
    nextPage: boolean
    posts: PostingFigure[]
  }
}
export async function getUserPosting(apiPath: string, option: Options) {
  const { payload }: UserPosting = await requester({
    method: 'GET',
    url: apiPath,
    data: option,
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
  formData.append('userAddPostDto', JSON.stringify(data))
  formData.append('file', image)

  const { payload } = await requester({
    method: 'POST',
    url: apiPath,
    data: formData,
  })
  return payload
}

// 게시글 수정
export async function postUserMod(
  apiPath: string,
  data: UpdateData,
  img: File | null,
) {
  const formData = new FormData()
  if (img === null) {
    formData.append('updatePostDto', JSON.stringify(data))
  } else {
    formData.append('updatePostDto', JSON.stringify(data))
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

// get
export function fetchGetMethod(apiPath: string) {
  const result = axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}${apiPath}`)
    .then((res) => res.data)
    .catch((error) => console.log(error))
  return result
}

// get (with params)
export async function fetchGetMethodParams(apiPath: string, option: Options) {
  const result = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}${apiPath}`, { params: option })
    .then((res) => res.data)
    .catch((error) => console.log(error))
  return result
}

// get (with params, header)
interface Config {
  headers: { [key: string]: string }
}
export async function fetchGetMethodParamsHeader(
  apiPath: string,
  config: Config,
) {
  const result = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}${apiPath}`, config)
    .then((res) => res.data)
    .catch((error) => console.log(error))
  return result
}
