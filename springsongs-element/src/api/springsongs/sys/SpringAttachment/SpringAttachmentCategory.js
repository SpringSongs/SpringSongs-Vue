import request from '@/utils/request'
import qs from 'qs'
export function search(data, page, size) {
  return request({
    url: '/SpringAttachmentCategory/ListByPage?page=' + page + '&size=' + size,
    method: 'post',
    data
  })
}

export function listAllToTree() {
  return request({
    url: '/SpringAttachmentCategory/ListToUiTree',
    method: 'get'
  })
}

export function get(id) {
  return request({
    url: '/SpringAttachmentCategory/Detail?id=' + id,
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: '/SpringAttachmentCategory/Create',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/SpringAttachmentCategory/Edit',
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
    url: '/SpringAttachmentCategory/SetDeleted',
    method: 'post',
    data
  })
}
