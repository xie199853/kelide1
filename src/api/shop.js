import request from '@/utils/request'

// 商品类型列表
export function getSkuClass() {
  return request({
    url: '/vm-service/skuClass/search',
    methods: 'GET',
    params: {
      pageIndex: 1,
      pageSize: 100
    }
  })
}

// 新增商品类型
export function addSkuClass(data) {
  return request({
    url: '/vm-service/skuClass',
    method: 'POST',
    data
  })
}

// 删除商品类型
export function delSkuClass(classId) {
  return request({
    url: `/vm-service/skuClass/${classId}`,
    method: 'DELETE'
  })
}

// 修改商品类型
export function reviseClass(data) {
  return request({
    url: `/vm-service/skuClass/${data.classId}`,
    method: 'PUT',
    data
  })
}

// 搜索商品类型
export function searchClass(params) {
  return request({
    url: `/vm-service/skuClass/search`,
    method: 'GET',
    params
  })
}

// 商品列表
export function getSku(params) {
  return request({
    url: `/vm-service/sku/search`,
    method: 'GET',
    params
  })
}

// 商品列表搜索
export function searchSku(params) {
  return request({
    url: `/vm-service/sku/search`,
    method: 'GET',
    params
  })
}

// 修改商品
export function reviseSku(data) {
  return request({
    url: `/vm-service/sku/${data.skuId}`,
    method: 'PUT',
    data
  })
}
