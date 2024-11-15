interface HttpRequest {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  headers?: HeadersInit
  data?: Record<string, unknown> | object | FormData
  params?: Record<string, unknown>
  cache?: 'force-cache' | 'no-store' // force-cache: SSG, no-store: SSR
  next?: {
    // ISR
    revalidate: number
  }
}

const httpRequest = async (
  url: string,
  { method, headers, data, params, cache, next }: HttpRequest,
) => {
  try {
    if (params) {
      const urlParams = new URLSearchParams(
        params as Record<string, string>,
      ).toString()
      url += `?${urlParams}`
    }

    const isFormData = data instanceof FormData

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
      {
        method,
        headers: {
          ...headers,
          ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        },
        body: isFormData ? data : JSON.stringify(data),
        cache,
        next,
        credentials: 'omit',
      },
    )

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

export default httpRequest
