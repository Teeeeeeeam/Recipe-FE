import {
  Comments,
  RecipeDetail,
  PostingDetail,
  PostingFigure,
  Recipe,
  PostingFigureAboutRecipe,
} from '../recipe'

export interface Response {
  success: boolean
  message: string
}

// ########## axios requester req options ##########
// 게시글 - 작성
export interface PostingWriteReq {
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
// 게시글 - 수정
export interface PostingModReq {
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
// 게시글 - 비밀번호 검증
export interface PostingVerifyPasswordReq {
  password: string
  postId: number
}
// 게시글 - 댓글 작성
export interface CommentWriteReq {
  commentContent: string
  postId: number
}
// 게시글 - 댓글 수정
export interface CommentModReq {
  commentContent: string
  commentId: number
}
// 게시글 - 댓글 삭제
export interface CommentDelReq {
  commentId: number
}

// ########## axios requester params options ##########
// 홈(게시글)
export interface GetHomePostingParams {
  size: number
}
// 레시피 - 페이지네이션
export interface GetRecipeListParams {
  page: number
  size: number
}
// 게시글 - 무한페이징
export interface GetPostingListParams {
  size: number
}
// 게시글 - 댓글 조회
export interface GetCommentParams {
  page: number
  size: number
  sort: string
}
// 게시글 - 레시피 참조(무한스크롤)
export interface GetPostingAboutRecipePageable {
  size: number
}
export interface GetPostingAboutRecipeParams {
  lastId: number | null
  lastLikeCount: number
}

// ########## axios requester payload options ##########
// 홈(레시피)
export interface GetHomeRecipe extends Response {
  data: {
    nextPage: boolean
    recipes: Recipe[] | []
  }
}
// 홈(게시글)
export interface GetHomePosting extends Response {
  data: {
    post: PostingFigure[] | []
    // nextPage: boolean
  }
}
// 레시피 - 페이지네이션
export interface GetRecipeList extends Response {
  data: {
    recipes: Recipe[] | []
    totlaElements: number
    totalPage: number
  }
}
// 레시피 - 상세페이지
export interface GetRecipeDetail extends Response {
  data: RecipeDetail
}
// 게시글 - 무한페이징
export interface GetPostingList extends Response {
  data: {
    posts: PostingFigure[]
    nextPage: boolean
  }
}
// 게시글 - 상세페이지
export interface GetPostingDetail extends Response {
  data: {
    post: PostingDetail
    comments: Comments[] | []
  }
}
// 게시글 - 댓글 조회
export interface GetComment extends Response {
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

// 게시글 - 레시피 참조
export interface GetPostingAboutRecipe extends Response {
  data: {
    posts: PostingFigureAboutRecipe[]
    nextPage: boolean
  }
}
