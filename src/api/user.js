import request from '@/utils/request'

/**
 * 人员工作量列表
 */
export const getStaffListAPI = (pageIndex, pageSize, userName, roleId, isRepair) => {
  return request({
    url: '/user-service/user/searchUserWork',
    method: 'GET',
    params: {
      pageIndex, pageSize, userName, roleId, isRepair
    }
  })
}
/**
 * 获取用户基本信息
 * @param {*} id
 * @returns Promise
 */
export const getUserInfoAPI = (id) => {
  return request({
    url: `/user-service/user/${id}`
  })
}
/**
 * 人员搜索(列表页)
 * @returns Promise
 */
export const userSearch = (pageIndex, pageSize) => {
  return request({
    url: `/user-service/user/search`,
    params: {
      pageIndex, pageSize
    }
  })
}
/**
 * 区域列表
 * @returns Promise
 */
export const getAreaListAPI = (pageIndex, pageSize) => {
  return request({
    url: '/vm-service/region/search',
    params: {
      pageIndex, pageSize
    }
  })
}
/**
 * 角色列表
 */
export const getRoleListAPI = () => {
  return request({
    url: '/user-service/role'
  })
}
/**
 * 新增角色
 */
export const addRoleAPI = (data) => {
  return request({
    url: '/user-service/user',
    method: 'POST',
    data
  })
}
/**
 * 删除人员
 */
export const delRoleAPI = (id) => {
  return request({
    url: `user-service/user/${id}`,
    method: 'DELETE'
  })
}
