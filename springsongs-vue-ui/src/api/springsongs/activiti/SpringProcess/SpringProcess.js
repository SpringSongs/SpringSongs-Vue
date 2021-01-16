import request from '@/utils/request'
export function search(page, size, category) {
  // var data = qs.stringify(data)
  return request({
    url: '/SpringProcess/ListByPage?page=' + page + '&size=' + size + '&category=' + category,
    method: 'get'
  })
}

export function updateState(state, procDefId) {
  return request({
    url: `/SpringProcess/ActiveOrSuspend/${state}`,
    method: 'put',
    params: {
      procDefId: procDefId
    }
  })
}

export function converToModel(procDefId) {
  return request({
    url: `/SpringProcess/Convert/${procDefId}`,
    method: 'put'
  })
}

export function save(data) {
  return request({
    url: '/SpringActProcessRouter/Create',
    method: 'post',
    data
  })
}

export function edit(data, id) {
  return request({
    url: '/SpringActProcessRouter/Edit',
    method: 'put',
    data
  })
}

export function findSpringActProcessRouterByProcDefKey(procDefKey) {
  return request({
    url: `/SpringActProcessRouter/FindSpringActProcessRouterByProcDefKey?procDefKey=${procDefKey}`,
    method: 'get'
  })
}
