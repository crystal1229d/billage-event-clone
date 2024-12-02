'use client'

import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  ReactNode,
} from 'react'
import { throttle } from 'lodash'
import styles from './InfiniteScroll.module.css'

interface Props {
  loadMore: (page: number) => Promise<any>
  hasMore: boolean
  loading: boolean
  children: ReactNode
  initialPage?: number
}

export default function InfiniteScroll({
  loadMore,
  hasMore,
  loading,
  children,
  initialPage = 0,
}: Props) {
  const [page, setPage] = useState<number>(initialPage)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const throttledLoadMore = useCallback(
    throttle(async () => {
      if (loading || !hasMore) return
      const newPage = page + 1
      await loadMore(newPage)
      setPage(newPage)
    }, 1000),
    [page, loading, hasMore],
  )

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting && !loading && hasMore) {
        throttledLoadMore()
      }
    },
    [throttledLoadMore, loading, hasMore],
  )

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: '25px',
    })

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        observerRef.current?.unobserve(loadMoreRef.current)
      }
    }
  }, [handleObserver])

  return (
    <div>
      {children}
      {hasMore && (
        <div ref={loadMoreRef} className={styles['load-more-placeholder']} />
      )}
      {loading && <p className={styles['loading']}>Loading more...</p>}
    </div>
  )
}
