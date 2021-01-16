import request from '@/utils/request'
// import qs from 'qs'
export function search(page, size, title, category) {
  return request({
    url: '/SpringTask/GetTodoTasks?page=' + page + '&size=' + size + '&title=' + title + '&category=' + category,
    method: 'get'
  })
}
