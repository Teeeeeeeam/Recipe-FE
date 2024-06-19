export const buildQueryString = (
  filter: string,
  searchInput: string,
): string => {
  let query: [string, string][] = [['', '']]
  if (filter === '재료') {
    query = [['ingredients', searchInput]]
  } else {
    query = [['title', searchInput]]
  }
  return new URLSearchParams(query).toString()
}

export const updateUrlAndFetchMembers = (
  queryString: string,
  setRecipes: React.Dispatch<React.SetStateAction<any[]>>,
  fetchRecipes: () => void,
): void => {
  const newUrl = `/admin/recipes?${queryString}`
  window.location.href = newUrl
  setRecipes([])
  fetchRecipes()
}
