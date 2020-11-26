import request from '@/utils/request'
// import qs from 'qs'
export function search(page, size, data) {
  // var data = qs.stringify(data)
  return request({
    url: '/SpringActVacation/ListByPage?page=' + page + '&size=' + size,
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: '/SpringActVacation/Create',
    method: 'post',
    data
  })
}

export function get(data) {
  return request({
    url: '/SpringActVacation/Detail',
    method: 'post',
    data
  })
}
