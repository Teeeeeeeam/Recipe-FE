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
      threshold: 0.8,
    }

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
          fetchMore()
        }
      },
      options,
    )

    lastElementRef.current && observer.observe(lastElementRef.current)

    return () => {
      observer.disconnect()
    }
  }, [fetchMore, hasMore])

  return lastElementRef
}

export default useInfiniteScroll
