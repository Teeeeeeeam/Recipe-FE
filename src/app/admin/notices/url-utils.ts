export const buildQueryString = (searchInput: string): string => {
  let query: [string, string][] = [['', '']]
  query = [['title', searchInput]]

  return new URLSearchParams(query).toString()
}

export const updateUrlAndFetchNotices = (
  queryString: string,
  setNotices: React.Dispatch<React.SetStateAction<any[]>>,
  fetchPosts: () => void,
): void => {
  const newUrl = `/admin/notices?${queryString}`
  window.location.href = newUrl
  setNotices([])
  fetchPosts()
}