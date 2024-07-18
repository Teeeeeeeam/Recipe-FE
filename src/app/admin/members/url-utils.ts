export const buildQueryString = (
  filter: string,
  searchInput: string,
): string => {
  let query: [string, string][] = [['', '']]
  if (filter === '아이디') {
    query = [['loginId', searchInput]]
  } else if (filter === '이름') {
    query = [['username', searchInput]]
  } else if (filter === '이메일') {
    query = [['email', searchInput]]
  } else if (filter === '닉네임') {
    query = [['nickname', searchInput]]
  }
  return new URLSearchParams(query).toString()
}

export const updateUrlAndFetchMembers = (queryString: string): void => {
  const newUrl = `/admin/members?${queryString}`
  window.history.pushState({}, '', newUrl)
}
