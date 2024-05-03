export const getLocalStorage = (key: string) => {
  const data = localStorage.getItem(key)
  if (!data) {
    return null
  }

  try {
    const parsedData = JSON.parse(data)
    return parsedData
  } catch (error) {
    console.error('Error parsing localStorage data:', error)
    return null
  }
}

export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const removeLoaclStorage = (key: string) => {
  localStorage.removeItem(key)
}
