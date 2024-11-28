'use client'

import { throttle } from 'lodash'
import { useState, useEffect, useRef, useCallback, ReactNode } from 'react'

type InfiniteScrollProps<T> = {
  fetchData: (page: number) => Promise<{ data: T[] }>
  renderItem: (item: T) => ReactNode
  initialPage?: number
}

const InfiniteScroll = <T,>({
  fetchData,
  renderItem,
  initialPage = 0,
}: InfiniteScrollProps<T>) => {
  const [data, setData] = useState<T[]>([])
  const [page, setPage] = useState(initialPage)
  const [loading, setLoading] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true)
      try {
        const initialData = await fetchData(initialPage)
        setData(initialData.data)
      } catch (error) {
        console.error('Failed to load initial data:', error)
      }
      setLoading(false)
    }

    loadInitialData()
  }, [fetchData, initialPage])

  const loadMore = async () => {
    setLoading(true)
    const newPage = page + 1
    try {
      const newData = await fetchData(newPage)
      setData((prevData) => [...prevData, ...newData.data])
      setPage(newPage)
    } catch (error) {
      console.error('Failed to load more data:', error)
    }
    setLoading(false)
  }

  const throttledLoadMore = useCallback(throttle(loadMore, 1000), [
    page,
    loading,
  ])

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting) {
        throttledLoadMore()
      }
    },
    [throttledLoadMore],
  )

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: '20px',
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
      <ul>
        {data.map((item, index) => (
          <li key={index}>{renderItem(item)}</li>
        ))}
      </ul>
      <div
        ref={loadMoreRef}
        style={{ height: '20px', backgroundColor: 'transparent' }}
      />
      {loading && <p>Loading...</p>}
    </div>
  )
}

export default InfiniteScroll
