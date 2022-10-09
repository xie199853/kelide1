import request from '@/utils/request'

/**
 * 人员工作量列表
 */
export const getStaffListAPI = (pageIndex, pageSize) => {
  return request({
    url: '/user-service/user/searchUserWork',
    method: 'GET',
    params: {
      pageIndex, pageSize
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
/**
 * 编辑人员
 */
export const editRoleAPI = (data, id) => {
  return request({
    url: `/user-service/user/${id}`,
    method: 'PUT',
    data
  })
}
/**
 * 获取当时工单汇总信息(人员统计头部信息)
 */
export const getTaskReportInfoAPI = (start, end) => {
  return request({
    url: `/task-service/task/taskReportInfo/${start}/${end}`
  })
}
/**
 * 获取用户工作量(工单统计)
 */
export const getUserWorkAPI = (userId, start, end) => {
  return request({
    url: `/task-service/task/userWork`,
    params: {
      userId, start, end
    }
  })
}
