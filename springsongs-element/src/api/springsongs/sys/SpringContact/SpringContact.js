import request from '@/utils/request'
import qs from 'qs'
export function search(data) {
  return request({
    url: '/SpringContact/ListByPage',
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: '/SpringContact/Detail?id=' + id,
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: '/SpringContact/Create',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/SpringContact/Edit/',
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
    url: '/SpringContact/SetDeleted',
    method: 'post',
    data
  })
}
