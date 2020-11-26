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
