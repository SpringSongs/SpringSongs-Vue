import request from '@/utils/request'
import qs from 'qs'
export function search(page, size, data) {
  return request({
    url: '/SpringDistrict/ListByPage?page=' + page + '&size=' + size,
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: '/SpringDistrict/Detail?id=' + id,
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: '/SpringDistrict/Create',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/SpringDistrict/Edit',
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
    url: '/SpringDistrict/SetDeleted',
    method: 'post',
    data
  })
}

export function listSpringDistrictByParentId(parentId) {
  return request({
    url: '/SpringDistrict/ListSpringDistrictByParentId?parentId=' + parentId,
    method: 'get'
  })
}
