import request from '@/utils/request'
import qs from 'qs'
export function search(page, size, data) {
  return request({
    url: '/SpringRole/ListByPage?page=' + page + '&size=' + size,
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: '/SpringRole/Detail/' + id,
    method: 'post'
  })
}

export function save(data) {
  return request({
    url: '/SpringRole/Create',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/SpringRole/Edit',
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
    url: '/SpringUser/SetDeleted',
    method: 'post',
    data
  })
}

export function listSpringResources(page, size, data) {
  return request({
    url: '/SpringResource/ListByPage?page=' + page + '&size=' + size,
    method: 'post',
    data
  })
}

export function listAuthority(roleId) {
  return request({
    url: '/SpringRole/ListAuthority/' + roleId,
    method: 'post'
  })
}

export function setAuthority(roleId, data) {
  data = qs.stringify({
    'moduleIds': data
  }, {
    indices: false
  })
  return request({
    url: '/SpringRole/SetAuthority/' + roleId,
    method: 'post',
    data
  })
}

export function listUserPage(page, size, data) {
  return request({
    url: '/SpringUser/ListByPage/?page=' + page + '&size=' + size,
    method: 'post',
    data
  })
}

export function ListUsersByRoleId(roleId, page, size, data) {
  return request({
    url: '/SpringUser/ListByRoleId/' + roleId + '?page=' + page + '&size=' + size,
    method: 'post',
    data
  })
}

export function setUsersToRole(roleId, data) {
  data = qs.stringify({
    'ids': data
  }, {
    indices: false
  })
  return request({
    url: '/SpringRole/SetUsers/' + roleId,
    method: 'post',
    data
  })
}
