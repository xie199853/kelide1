import request from '@/utils/request'
// 获取区域列表

export const getSearch = (data) => {
  return request({
    url: '/vm-service/region/search',
    data
  })
}
// 获取新增
export const getNewAdditions = (data) => {
  return request({
    url: '/vm-service/region',
    method: 'POST',
    data
  })
}
