import request from '@/utils/request'
export function search(page, size, data) {
  return request({
    url: '/SpringLoginLog/ListByPage?page=' + page + '&size=' + size,
    method: 'post',
    data
  })
}
