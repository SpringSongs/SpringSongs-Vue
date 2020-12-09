import request from '@/utils/request'
import qs from 'qs'
export function search(page, size, data) {
  return request({
    url: '/SpringSiteMessage/ListByPage?page=' + page + '&size=' + size,
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: '/SpringSiteMessage/Detail?id=' + id,
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: '/SpringSiteMessage/Create',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/SpringSiteMessage/Edit',
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
    url: '/SpringSiteMessage/SetDeleted',
    method: 'post',
    data
  })
}

export function countNotReadMessageByUserId() {
  return request({
    url: '/SpringSiteMessage/CountNotReadMessageByUserId',
    method: 'get'
  })
}
