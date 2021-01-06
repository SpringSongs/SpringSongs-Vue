import request from '@/utils/request'
import qs from 'qs'
export function search(data,page,size) {
  return request({
    url: '/SpringAttachment/ListByPage?page='+page+'&size='+size,
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: '/SpringAttachment/Detail/' + id,
    method: 'post'
  })
}

export function save(data) {
  return request({
    url: '/SpringAttachment/Create',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/SpringAttachment/Edit/',
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
    url: '/SpringAttachment/SetDeleted',
    method: 'post',
    data
  })
}

export function uploadFile(data) {
  return request({
    url: '/SpringAttachment/Upload',
    method: 'post',
    data,
    headers: {
      'Conten-type': 'multipart/form-data'
    }
  })
}
