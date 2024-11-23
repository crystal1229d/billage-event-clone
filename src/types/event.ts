export interface EventsListRequest {
  size: number
  page: number
  visibility: boolean
}
export interface EventsListResponse {
  state: number
  message: string
  error: string
  data: {
    list: Event[]
  }
  total: number
  pageInfo: {
    page: string
    size: string
  }
}

export interface EventRequest {
  id: string
}
export interface EventResponse {
  state: number
  message: string
  error: string
  data: Event
}

export interface Event {
  event_idx: number
  title: string
  view_cnt: number
  visibility: number
  reg_date: number
  start_date: number
  end_date: number
  pc_img: string
  mobile_img: string
  pc_thumbnail_img: string
  mobile_thumbnail_img: string
  processing: number
}
