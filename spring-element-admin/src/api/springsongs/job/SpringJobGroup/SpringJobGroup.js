import request from '@/utils/request'
import qs from 'qs'
export function search(page, size, data) {
  return request({
    url: '/SpringJobGroup/ListByPage?page=' + page + '&size=' + size,
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: '/SpringJobGroup/Detail/' + id,
    method: 'post'
  })
}

export function save(data) {
  return request({
    url: '/SpringJobGroup/Create',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/SpringJobGroup/Edit',
    method: 'post',
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
    url: '/SpringJobGroup/SetDeleted',
    method: 'post',
    data
  })
}
