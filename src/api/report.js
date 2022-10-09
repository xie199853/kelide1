import request from '@/utils/request'
/**
 * 获取一定时间范围之内的订单总数
 */
export const getOrderCountAPI = (start, end) => {
  return request({
    url: '/order-service/report/orderCount',
    params: {
      start, end
    }
  })
}
/**
 * 获取一定时间范围之内的收入
 */
export const getOrderAmountAPI = (start, end) => {
  return request({
    url: '/order-service/report/orderAmount',
    params: {
      start, end
    }
  })
}
/**
 * 获取一定时间范围之内的分成总数
 */
export const getTotalBillAPI = (start, end) => {
  return request({
    url: '/order-service/report/totalBill',
    params: {
      start, end
    }
  })
}
/**
 * 获取一定日期范围之内的合作商分成汇总数据
 */
export const getPartnerCollectAPI = (start, end, pageIndex, pageSize) => {
  return request({
    url: '/order-service/report/partnerCollect',
    params: {
      start, end, pageIndex, pageSize
    }
  })
}
/**
 * 合作商搜索
 */
export const getPartnersAPI = (pageIndex, pageSize) => {
  return request({
    url: '/user-service/partner/search',
    params: {
      pageIndex, pageSize
    }
  })
}
