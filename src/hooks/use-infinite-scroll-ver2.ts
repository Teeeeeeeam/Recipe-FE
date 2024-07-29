import { useCallback, useEffect, useRef } from 'react'

export default function useInfiniteScrollVer2(
  next: boolean,
  setIsMoreLoading: (value: boolean) => void,
  dependencies: any,
) {
  const lastElForLoad = useRef(null)

  const handleObserver = useCallback(
    (entries: any) => {
      const target = entries[0]
      if (target.isIntersecting) {
        if (next) {
          setIsMoreLoading(true)
        }
      }
    },
    [dependencies],
  )

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    }
    const observer = new IntersectionObserver(handleObserver, option)
    if (lastElForLoad.current) {
      observer.observe(lastElForLoad.current)
    }
    return () => observer.disconnect()
  }, [handleObserver])

  return lastElForLoad
}
