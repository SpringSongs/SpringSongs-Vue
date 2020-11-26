import request from '@/utils/request'
import qs from 'qs'
export function search(page, size, data) {
  return request({
    url: '/SpringJobHistory/ListByPage?page=' + page + '&size=' + size,
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
    url: '/SpringJobHistory/SetDeleted',
    method: 'post',
    data
  })
}
