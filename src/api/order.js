import request from '@/utils/request'
export function getOrder(pageIndex, pageSize, orderNo, startDate, endDate) {
  return request({
    url: '/order-service/order/search',
    method: 'get',
    params: {
      pageIndex,
      pageSize,
      orderNo,
      startDate,
      endDate
    }
  })
}
