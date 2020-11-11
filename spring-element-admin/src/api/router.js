import request from '@/utils/request'
import qs from 'qs'
export function getRouters() {
  return request({
    url: '/SpringResource/GetRouters',
    method: 'get'
  })
}
