import request from '@/utils/request'
import qs from 'qs'
export function search(page, size, data) {
  return request({
    url: '/SpringJob/ListByPage?page=' + page + '&size=' + size,
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: '/SpringJob/Detail/' + id,
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: '/SpringJob/AddTask',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/SpringJob/UpdateTask',
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
    url: '/SpringJob/SetDeleted',
    method: 'post',
    data
  })
}

export function listAllSpringJobGroupCategory() {
  return request({
    url: '/SpringJobGroup/ListAll',
    method: 'get'
  })
}

export function pause(data) {
  data = qs.stringify(data)
  return request({
    url: '/SpringJob/PauseTask',
    method: 'put',
    data
  })
}

export function resume(data) {
  data = qs.stringify(data)
  return request({
    url: '/SpringJob/ResumeTask',
    method: 'put',
    data
  })
}

export function deleteTask(data) {
  data = qs.stringify(data)
  return request({
    url: '/SpringJob/DeleteTask',
    method: 'post',
    data
  })
}
