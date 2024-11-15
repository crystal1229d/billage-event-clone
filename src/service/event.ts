import httpRequest from './index'

export const getEvents = async (size: number = 5, page: number = 0) => {
  const { data, error } = await httpRequest('/eventApi/event', {
    method: 'get',
    params: { size, page, visibility: true },
  })

  if (error) throw new Error(typeof error === 'string' ? error : 'error')
  return data
}

export const getEventById = async (id: string) => {
  const { data, error } = await httpRequest(`/eventApi/event/${id}`, {
    method: 'get',
  })

  if (error) throw new Error(typeof error === 'string' ? error : 'error')
  return data
}
