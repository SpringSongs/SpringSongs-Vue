import request from '@/utils/request'
import qs from 'qs'
export function search(page, size, data) {
  return request({
    url: '/SpringSystem/ListByPage?page=' + page + '&size=' + size,
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: '/SpringSystem/Detail?id=' + id,
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: '/SpringSystem/Create',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/SpringSystem/Edit/',
    method: 'put',
    data
  })
}

export function batchDelete(data) {
  data = qs.stringify({
    'ids': data
  }, {
    indices: false
  })
  return request({
    url: '/SpringSystem/SetDeleted',
    method: 'post',
    data
  })
}
