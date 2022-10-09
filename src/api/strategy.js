import request from '@/utils/request'

export function getVms() {
  return request({
    url: '/vm-service/policy'
  })
}

// 新增策略
export function addVms(data) {
  return request({
    url: '/vm-service/policy',
    method: 'POST',
    data
  })
}

// 删除策略
export function delVms(policyId) {
  return request({
    url: `/vm-service/policy/${policyId}`,
    method: 'DELETE'
  })
}

// 搜索策略
export function searchVms(params) {
  return request({
    url: `/vm-service/policy/search`,
    method: 'GET',
    params
  })
}

// 查看详情
export function vmPolicy(innerCode) {
  return request({
    url: `/vm-service/policy/vmList/${innerCode}`,
    params: {
      pageIndex: 1,
      pageSize: 20
    }
  })
}

// 修改策略
export function reviseVms(data) {
  return request({
    url: `/vm-service/policy/${data.policyId}`,
    method: 'PUT',
    data
  })
}
