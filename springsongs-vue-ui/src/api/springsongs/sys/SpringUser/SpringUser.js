import request from '@/utils/request'
import qs from 'qs'
export function search(page, size, data) {
  return request({
    url: '/SpringUser/ListByPage?page=' + page + '&size=' + size,
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: '/SpringUser/Detail?id=' + id,
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: '/SpringUser/Create',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/SpringUser/Edit',
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
    url: '/SpringUser/SetDeleted',
    method: 'post',
    data
  })
}

export function listOrganizeTree() {
  return request({
    url: '/SpringOrganization/ListAllToTree',
    method: 'get'
  })
}

export function getUserInfo() {
  return request({
    url: '/SpringUser/GetUserInfo',
    method: 'get',
  })
}

export function updateUserInfo(data) {
  return request({
    url: '/SpringUser/UpdateUserInfo',
    method: 'put',
    data
  })
}

export function updatePwd(data) {
  return request({
    url: '/SpringUser/SetPwd',
    method: 'post',
    data
  })
}

export function userUpdatePwd(data) {
  return request({
    url: '/SpringUser/UserUpdatePwd',
    method: 'post',
    data
  })
}

export function listRole(page, size, data) {
  return request({
    url: '/SpringRole/ListByPage?page=' + page + '&size=' + size,
    method: 'post',
    data
  })
}

export function ListRoleByUserId(userId, page, size, data) {
  return request({
    url: '/SpringRole/ListByUserId/' + userId + '/?page=' + page + '&size=' + size,
    method: 'post',
    data
  })
}

export function setRoleSave(userId, data) {
  data = qs.stringify({
    'ids': data
  }, {
    indices: false
  })
  return request({
    url: '/SpringUser/SetRoles/' + userId,
    method: 'post',
    data
  })
}
