import axios, { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios'
import requester from '.'
import {
  EmailOption,
  MyLikesPosting,
  MyLikesRecipe,
  MyPostings,
  NickNameOption,
  UserInfo,
  verifyEmailOption,
} from '@/types/user'
import { Options } from '@/types/recipe'

export async function checkUser(apiPath: string, token: string | undefined) {
  const result = await axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}${apiPath}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => res.data)
    .catch((error) => console.log(error))
  return result
}

interface SuccessFetch {
  status: number
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders
  payload: {
    data: string
    message: string
    success: boolean
  }
}
export async function checkExpireToken() {
  const options = {
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token/validate`,
  }
  const result: SuccessFetch = await requester(options)
  return result
}

// 레시피 like
interface LikeOptions {
  memberId: string
  recipeId?: number
  postId?: number
}
interface Like {
  payload: {
    message: string
    success: boolean
  }
}
export async function checkLikesForRecipe(apiPath: string, params: number) {
  const { payload }: Like = await requester({
    method: 'GET',
    url: `${apiPath}/${params}`,
  })
  return payload
}
export async function doLikeForRecipe(apiPath: string, params: LikeOptions) {
  const { payload }: Like = await requester({
    method: 'POST',
    url: apiPath,
    data: params,
  })
  return payload
}

// 게시글 like
export async function checkLikesForPosting(apiPath: string, id: string) {
  const { payload }: Like = await requester({
    method: 'GET',
    url: apiPath,
    params: { postId: id },
  })
  return payload
}
export async function doLikeForPosting(apiPath: string, params: LikeOptions) {
  const { payload }: Like = await requester({
    method: 'POST',
    url: apiPath,
    data: params,
  })
  return payload
}

// 레시피 즐겨찾기
interface DoBookmarkOption {
  memberId: string
  recipeId: number
}
interface InquiryBookmark {
  payload: {
    message: string
    success: boolean
  }
}
interface DoBookmark {
  payload: {
    message: string
    success: boolean
    data: {
      ['즐겨 찾기 상태']: boolean
    }
  }
}
export async function checkBookmark(apiPath: string, params: number) {
  const { payload }: InquiryBookmark = await requester({
    method: 'GET',
    url: `${apiPath}?recipe-id=${params}`,
  })
  return payload
}
export async function doBookmark(apiPath: string, option: DoBookmarkOption) {
  const { payload }: DoBookmark = await requester({
    method: 'POST',
    url: apiPath,
    data: option,
  })
  return payload
}

// 마이페이지 로그인 검증
export async function enterMyPage(apiPath: string, option: any) {
  const { payload } = await requester({
    method: 'POST',
    url: apiPath,
    data: option,
  })
  return payload
}

// 마이페이지 - 로그인 정보
interface InquiryUser {
  payload: {
    success: boolean
    message: string
    data: UserInfo
  }
}
export async function inquiryUser(apiPath: string, option: string) {
  const { payload }: InquiryUser = await requester({
    method: 'GET',
    url: `${apiPath}${option}`,
  })
  return payload
}

// 마이페이지 - 작성 게시글 조회
interface InquiryPosting {
  payload: {
    success: boolean
    message: string
    data: {
      content: MyPostings[] | []
      nextPage: boolean
    }
  }
}
export async function inquiryPosting(apiPath: string) {
  const { payload }: InquiryPosting = await requester({
    method: 'GET',
    url: apiPath,
  })
  return payload
}

// 마이페이지 - 게시글 좋아요 조회
interface InquiryLikePosting {
  payload: {
    success: boolean
    message: string
    data: {
      content: MyLikesPosting[] | []
      nextPage: boolean
    }
  }
}
export async function inquiryLikePosting(apiPath: string, option: Options) {
  const { payload }: InquiryLikePosting = await requester({
    method: 'GET',
    url: apiPath,
    params: option,
  })
  return payload
}

// 마이페이지 - 레시피 좋아요 조회
interface InquiryLikeRecipe {
  payload: {
    success: boolean
    message: string
    data: {
      content: MyLikesRecipe[] | []
      nextPage: boolean
    }
  }
}
export async function inquiryLikeRecipe(apiPath: string, option: Options) {
  const { payload }: InquiryLikeRecipe = await requester({
    method: 'GET',
    url: apiPath,
    params: option,
  })
  return payload
}

// 마이페이지 - 닉네임 수정
export async function updateNickName(apiPath: string, option: NickNameOption) {
  const { payload } = await requester({
    method: 'PUT',
    url: apiPath,
    data: option,
  })
  return payload
}

// 마이페이지 - 이메일 수정
export async function updateEmail(apiPath: string, option: EmailOption) {
  const { payload } = await requester({
    method: 'PUT',
    url: apiPath,
    data: option,
  })
  return payload
}
// 마이페이지 - 이메일 검증 코드 보내기
export async function sendEmail(apiPath: string, option: string) {
  const { payload } = await requester({
    method: 'POST',
    url: apiPath,
    params: { email: option },
  })
  return payload
}
// 마이페이지 - 이메일 코드 검증
export async function confirmCode(apiPath: string, option: verifyEmailOption) {
  const { payload } = await requester({
    method: 'POST',
    url: apiPath,
    params: { email: option.email, code: option.code },
  })
  return payload
}

// 마이페이지 - 게시글 (무한스크롤)
export async function postingAll(apiPath: string) {
  const { payload } = await requester({
    method: 'POST',
    url: apiPath,
  })
  return payload
}

// 마이페이지 - 회원 탈퇴
interface WidthdrawalOption {
  loginId: string
  checkBox: boolean
}
export async function doWidthdrawalUser(
  apiPath: string,
  option: WidthdrawalOption,
) {
  const { payload } = await requester({
    method: 'DELETE',
    url: apiPath,
    data: option,
  })
  return payload
}
