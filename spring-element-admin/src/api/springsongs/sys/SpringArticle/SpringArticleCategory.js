import request from '@/utils/request'
import qs from 'qs'
export function search(page, sise, data) {
  return request({
    url: '/SpringArticleCategory/ListByPage?page=' + page + '&size=' + sise,
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: '/SpringArticleCategory/Detail?id=' + id,
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: '/SpringArticleCategory/Create',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/SpringArticleCategory/Edit',
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
    url: '/SpringArticleCategory/SetDeleted',
    method: 'post',
    data
  })
}

export function getCategorysByParent(parentId) {
  return request({
    url: '/SpringArticleCategory/GetCategorysByParent?parentId=' + parentId,
    method: 'get'
  })
}
