import {
  EventResponse,
  EventsListResponse,
  EventsListRequest,
  EventRequest,
} from '@/types/event'
import httpRequest from './index'

export const getEvents = async (
  requestParams: EventsListRequest = { size: 5, page: 0, visibility: true },
): Promise<EventsListResponse> => {
  const { size, page, visibility } = requestParams
  const { data, error } = await httpRequest('/eventApi/event', {
    method: 'get',
    params: { size, page, visibility },
  })

  if (error)
    throw new Error(
      typeof error === 'string' ? error : 'An unexpected error occurred',
    )
  return data
}

export const getEventById = async (
  requestParams: EventRequest,
): Promise<EventResponse> => {
  const { id } = requestParams
  const { data, error } = await httpRequest(`/eventApi/event/${id}`, {
    method: 'get',
    cache: 'force-cache',
  })

  if (error)
    throw new Error(
      typeof error === 'string' ? error : 'An unexpected error occurred',
    )
  return data
}
