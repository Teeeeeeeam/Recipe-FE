import requester from '.'
import {
  EmailOption,
  MyBookmark,
  MyLikesPosting,
  MyLikesRecipe,
  MyPostings,
  MyQuestion,
  NickNameOption,
  UserInfo,
  verifyEmailOption,
} from '@/types/user'
import { LoginInfo } from '@/store/user-info-slice'

// 로그인 한 유저 정보 확인
interface CheckUser {
  payload: {
    success: boolean
    message: string
    data: LoginInfo
  }
}
export async function checkUser() {
  const { payload }: CheckUser = await requester({
    method: 'POST',
    url: '/api/userinfo',
  })
  return payload
}

// 레시피 like
interface Like {
  payload: {
    message: string
    success: boolean
  }
}
export async function checkLikesForRecipe(recipeId: number) {
  const { payload }: Like = await requester({
    method: 'GET',
    url: `/api/user/recipe/${recipeId}/like/check`,
  })
  return payload
}
export async function doLikeForRecipe(req: { recipeId: number }) {
  const { payload }: Like = await requester({
    method: 'POST',
    url: '/api/user/recipe/like',
    data: req,
  })
  return payload
}

// 게시글 like
export async function checkLikesForPosting(postId: number) {
  const { payload }: Like = await requester({
    method: 'GET',
    url: `/api/user/posts/${postId}/like/check`,
  })
  return payload
}
export async function doLikeForPosting(req: { postId: number }) {
  const { payload }: Like = await requester({
    method: 'POST',
    url: `/api/user/posts/like`,
    data: req,
  })
  return payload
}

// 레시피 즐겨찾기
interface InquiryBookmark {
  payload: {
    success: boolean
    message: string
  }
}
interface DoBookmark {
  payload: {
    success: boolean
    message: string
  }
}
export async function checkBookmark(recipeId: number) {
  const { payload }: InquiryBookmark = await requester({
    method: 'GET',
    url: `/api/user/recipe/${recipeId}/bookmarks/check`,
  })
  return payload
}
export async function doBookmark(option: { recipeId: number }) {
  const { payload }: DoBookmark = await requester({
    method: 'POST',
    url: '/api/user/recipe',
    data: option,
  })
  return payload
}

// 마이페이지 로그인 검증
export async function enterMyPage(option: {
  password: string
  loginId: string | null
  loginType: string | null
}) {
  const { payload } = await requester({
    method: 'POST',
    url: '/api/user/info/valid',
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
export async function inquiryUser() {
  const { payload }: InquiryUser = await requester({
    method: 'GET',
    url: `/api/user/info`,
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
export async function inquiryPosting(
  params: { size: number },
  lastId: number | null,
) {
  const { payload }: InquiryPosting = await requester({
    method: 'GET',
    url: `/api/user/info/posts${lastId ? `?lastId=${lastId}` : ''}`,
    params,
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
export async function inquiryLikePosting(params: {
  size: number
  lastId: number | null
}) {
  const { payload }: InquiryLikePosting = await requester({
    method: 'GET',
    url: `/api/user/info/posts/likes`,
    params,
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
export async function inquiryLikeRecipe(params: {
  size: number
  lastId: number | null
}) {
  const { payload }: InquiryLikeRecipe = await requester({
    method: 'GET',
    url: `/api/user/info/recipe/likes`,
    params,
  })
  return payload
}

// 마이페이지 - 북마크 조회
interface InquiryBookmarkMyPage {
  payload: {
    success: boolean
    message: string
    data: {
      bookmarkList: MyBookmark[] | []
      nextPage: boolean
    }
  }
}
export async function inquiryBookmark(
  req: { size: number },
  lastId: number | null,
) {
  const { payload }: InquiryBookmarkMyPage = await requester({
    method: 'GET',
    url: `/api/user/info/bookmark${lastId ? `?lastId=${lastId}` : ''}`,
    params: req,
  })
  return payload
}

// 마이페이지 - 닉네임 수정
export async function updateNickName(req: NickNameOption) {
  const { payload } = await requester({
    method: 'PUT',
    url: '/api/user/info/update/nickname',
    data: req,
  })
  return payload
}

// 마이페이지 - 이메일 수정
export async function updateEmail(req: EmailOption) {
  const { payload } = await requester({
    method: 'PUT',
    url: '/api/user/info/update/email',
    data: req,
  })
  return payload
}
// 마이페이지 - 이메일 검증 코드 보내기
export async function sendEmail(params: { email: string }) {
  const { payload } = await requester({
    method: 'POST',
    url: '/api/code/email-confirmation/send',
    params,
  })
  return payload
}
// 마이페이지 - 이메일 코드 검증
export async function confirmCode(req: verifyEmailOption) {
  const { payload } = await requester({
    method: 'POST',
    url: '/api/code/email-confirmation/verify',
    data: req,
  })
  return payload
}

// 마이페이지 - 회원 탈퇴
interface WidthdrawalOption {
  checkBox: boolean
}
export async function doWidthdrawalUser(req: WidthdrawalOption) {
  const { payload } = await requester({
    method: 'DELETE',
    url: '/api/user/info/disconnect',
    data: req,
  })
  return payload
}
