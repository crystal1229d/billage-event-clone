interface HttpRequestOptions extends RequestInit {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  data?: Record<string, unknown> | object | FormData
  params?: Record<string, unknown>
  next?: {
    revalidate: number
  }
  cache?: 'force-cache' | 'no-store'
}

const isServer = typeof window === 'undefined'

const httpRequest = async (url: string, options: HttpRequestOptions) => {
  try {
    const { method, headers, data, params, cache, next, ...rest } = options

    if (params) {
      const urlParams = new URLSearchParams(
        params as Record<string, string>,
      ).toString()
      url += `?${urlParams}`
    }

    const isFormData = data instanceof FormData

    const response = await fetch(`${isServer ? getBaseUrl(url) : ''}${url}`, {
      method,
      headers: {
        ...headers,
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      },
      body: isFormData ? data : JSON.stringify(data),
      cache,
      next,
      ...rest,
    })

    if (!response.ok) {
      console.error(
        `HTTP error! Status: ${response.status}, Status Text: ${response.statusText}`,
      )
      throw new Error(`HTTP Error! ${response.status}`)
    }

    try {
      return { data: await response.json() }
    } catch (err) {
      return { error: 'Invalid JSON response' }
    }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

const getBaseUrl = (url: string) => {
  if (url.startsWith('/eventApi')) {
    return process.env.NEXT_PUBLIC_EVENT_API_BASE_URL
  } else if (url.startsWith('/api')) {
    return process.env.NEXT_PUBLIC_RENTAL_API_BASE_URL
  }
  return ''
}

export default httpRequest
