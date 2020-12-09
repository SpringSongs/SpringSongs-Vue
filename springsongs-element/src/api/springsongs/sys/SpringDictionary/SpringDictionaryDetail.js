import request from '@/utils/request'
import qs from 'qs'
export function search(data) {
  return request({
    url: '/SpringDictionaryDetail/ListByPage',
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: '/SpringDictionaryDetail/Detail?id=' + id,
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: '/SpringDictionaryDetail/Create',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/SpringDictionaryDetail/Edit/',
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
    url: '/SpringDictionaryDetail/SetDeleted',
    method: 'post',
    data
  })
}
