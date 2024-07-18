export const buildQueryString = (
  filter: string,
  searchInput: string,
): string => {
  let query: [string, string][] = [['', '']]
  if (filter === '요리글 제목') {
    query = [['postTitle', searchInput]]
  } else if (filter === '레시피 제목') {
    query = [['recipeTitle', searchInput]]
  } else if (filter === '아이디') {
    query = [['id', searchInput]]
  }
  return new URLSearchParams(query).toString()
}

export const updateUrlAndFetchPosts = (queryString: string): void => {
  const newUrl = `/admin/user-posts?${queryString}`
  window.history.pushState({}, '', newUrl)
}
