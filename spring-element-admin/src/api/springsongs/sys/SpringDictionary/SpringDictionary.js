import request from '@/utils/request'
import qs from 'qs'
export function search(data) {
  return request({
    url: '/SpringDictionary/ListByPage',
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: '/SpringDictionary/Detail/' + id,
    method: 'post'
  })
}

export function save(data) {
  return request({
    url: '/SpringDictionary/Create',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/SpringDictionary/Edit/',
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
    url: '/SpringDictionary/SetDeleted',
    method: 'post',
    data
  })
}
