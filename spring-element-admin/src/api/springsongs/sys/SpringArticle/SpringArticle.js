import request from '@/utils/request'
import qs from 'qs'
export function search(data) {
  return request({
    url: '/SpringArticle/ListByPage',
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: '/SpringArticle/Detail/' + id,
    method: 'post'
  })
}

export function save(data) {
  return request({
    url: '/SpringArticle/Create',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/SpringArticle/Edit/',
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
    url: '/SpringArticle/SetDeleted',
    method: 'post',
    data
  })
}

export function auditStatus(id) {
  return request({
    url: '/SpringArticle/Audit/' + id,
    method: 'post'
  })
}

export function hotStatus(id) {
  return request({
    url: '/SpringArticle/HotStatus/' + id,
    method: 'post'
  })
}

export function topStatus(id) {
  return request({
    url: '/SpringArticle/TopStatus/' + id,
    method: 'post'
  })
}

export function featured(id) {
  return request({
    url: '/SpringArticle/Featured/' + id,
    method: 'post'
  })
}

export function loadCategoryTreeByParentId(data) {
  console.log(data)
  data = qs.stringify({
    'parentId': data
  })
  return request({
    url: '/SpringArticleCategory/GetCategorysByParent',
    method: 'post',
    data
  })
}

export function listCategoryToTree() {
  return request({
    url: '/SpringArticleCategory/listAllRecord',
    method: 'post'
  })
}
