/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const fetchMoreData = async (page: number, limit: number) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`,
  )
  const newData = await res.json()
  return newData
}

const InfiniteScroll = () => {
  const [data, setData] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true)
      const initialData = await fetchMoreData(1, 10)
      setData(initialData)
      setLoading(false)
    }

    loadInitialData()
  }, [])

  const loadMore = async () => {
    setLoading(true)
    const newPage = page + 1
    const newData = await fetchMoreData(newPage, 10)
    setData((prevData) => [...prevData, ...newData])
    setPage(newPage)
    setLoading(false)
  }

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting) {
        loadMore()
      }
    },
    [loadMore, page],
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
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
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
