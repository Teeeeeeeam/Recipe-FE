'use client'

import { DebouncedFunc } from 'lodash'
import { useEffect, useRef } from 'react'

const useInfiniteScroll = (
  fetchMore: DebouncedFunc<() => Promise<void>> | (() => Promise<void>),
  hasMore: boolean,
  id?: number,
) => {
  const lastElementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasMore) return
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.9,
    }

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
          fetchMore()
        }
      },
      options,
    )
    const element = lastElementRef.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [fetchMore, hasMore])

  return lastElementRef
}

export default useInfiniteScroll
