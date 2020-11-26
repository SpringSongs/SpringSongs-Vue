import request from '@/utils/request'
import qs from 'qs'
export function search(page, size, category) {
  // var data = qs.stringify(data)
  return request({
    url: '/SpringProcess/ListByPage?page=' + page + '&size=' + size + '&category=' + category,
    method: 'get'
  })
}

export function listUserTask(data) {
  return request({
    url: '/SpringActUseTask/listUserTaskByProcDefKey?procDefKey=' + data,
    method: 'get'
  })
}

export function initSingleDefinition(data) {
  data = qs.stringify(data)
  return request({
    url: '/SpringActUseTask/initSingleDefinition',
    method: 'post',
    data
  })
}

export function initAllDefinition(data) {
  data = qs.stringify(data)
  return request({
    url: '/SpringActUseTask/initAllDefinition',
    method: 'post',
    data
  })
}

export function setUserToTask(data, procDefKey) {
  // data = qs.stringify(data)
  return request({
    url: '/SpringActUseTask/setUserToTask?procDefKey=' + procDefKey,
    method: 'post',
    data
  })
}
