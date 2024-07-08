'use client'

import { useEffect, useRef } from 'react'

const useInfiniteScroll = (
  fetchMore: () => Promise<void>,
  hasMore: boolean,
) => {
  const lastElementRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!hasMore) return
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    }

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
          fetchMore()
        }
      },
      options,
    )

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current)
    }

    return () => {
      if (lastElementRef.current) {
        observer.unobserve(lastElementRef.current)
      }
    }
  }, [fetchMore, hasMore])

  return lastElementRef
}

export default useInfiniteScroll
