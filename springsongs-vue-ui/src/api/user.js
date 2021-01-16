import request from '@/utils/request'
import qs from 'qs'
export function login(data) {
  var data=qs.stringify(data)
  return request({
    url: '/Login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
	console.log(token);
  return request({
    url: '/SpringUser/GetUserInfo',
    method: 'get',
    //params: { token }
  })
}

export function logout() {
  return request({
    url: '/Logout',
    method: 'post'
  })
}


export function getRouters() {
  return request({
    url: '/SpringResource/GetRouters',
    method: 'get',
  })
}
