import request from '@/utils/request'
export function search(page, size, data) {
  // var data = qs.stringify(data)
  return request({
    url: '/SpringActModel/ListByPage?page=' + page + '&size=' + size,
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: '/SpringActModel/Create/' + id,
    method: 'post'
  })
}

export function save(data) {
  return request({
    url: '/SpringActModel/Create',
    method: 'post',
    data
  })
}

export function edit(data, id) {
  return request({
    url: '/SpringActModel/Edit/' + id,
    method: 'put',
    data
  })
}

export function batchDelete(id) {
  return request({
    url: '/SpringActModel/SetDeleted/' + id,
    method: 'post'
  })
}

export function listAllSpringActCategory() {
  return request({
    url: '/SpringActCategory/ListAll',
    method: 'get'
  })
}

export function deploy(id) {
  return request({
    url: `/SpringActModel/Deploy/${id}`,
    method: 'put'
  })
}

export function exportXML(id) {
  return request({
    url: `/SpringActModel/Export/${id}`,
    method: 'get'
  })
}
