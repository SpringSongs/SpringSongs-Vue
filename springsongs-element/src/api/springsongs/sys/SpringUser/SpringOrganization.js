import request from '@/utils/request'
import qs from 'qs'
export function search(data,page,size) {
  return request({
    url: '/SpringOrganization/ListByPage?page='+page+'&size='+size,
    method: 'post',
    data
  })
}

export function listAllToTree() {
  return request({
    url: '/SpringOrganization/ListAllToTree',
    method: 'get'
  })
}

export function get(id) {
  return request({
    url: '/SpringOrganization/Detail?id=' + id,
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: '/SpringOrganization/Create',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/SpringOrganization/Edit',
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
    url: '/SpringOrganization/SetDeleted',
    method: 'post',
    data
  })
}

export function listOrganizationsByParent(parentId) {
  parentId = qs.stringify({
    'parentId': parentId
  })
  return request({
    url: '/SpringOrganization/listOrganizationsByParent',
    method: 'get',
    parentId
  })
}
