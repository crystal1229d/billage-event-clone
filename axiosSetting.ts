import axios from "axios";
import Cookies from "js-cookie";

export const instance = axios.create({
  baseURL: "/eventApi/",
  headers: {
    "X-CSRFToken": Cookies.get("csrftoken") || "",
  },
  withCredentials: true,
});

/** 이벤트 리스트 가져오기 */
export const getEvents = (size: number, page: number) =>
  instance.get(`event`, {
    params: {
      size,
      page,
      visibility: true,
    },
  }).then((res) => res.data);

/** 이벤트 상세 정보 가져오기 */
export const getEventById = (id: string) =>
  instance.get(`event/${id}`).then((res) => res.data);
