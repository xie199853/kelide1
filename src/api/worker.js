import request from '@/utils/request'

export function getWorkSearch(pageIndex, taskCode, status, isRepair) {
  return request({
    url: '/task-service/task/search',
    method: 'get',
    params: {
      pageIndex,
      taskCode,
      status,
      isRepair
    }
  })
}
export function getTaskDetails(taskId) {
  return request({
    url: `/task-service/taskDetails/${taskId}`,
    method: 'get'
  })
}
export function getChannelList(innerCode) {
  return request({
    url: `/vm-service/channel/channelList/${innerCode}`,
    method: 'get'
  })
}

export function getOperatorList(innerCode) {
  return request({
    url: `/user-service/user/operatorList/${innerCode}`,
    method: 'get'
  })
}
export function createTask(newTask) {
  return request({
    url: '/task-service/task/create',
    method: 'POST',
    data: newTask
  })
}
export function getTaskInfo(taskId) {
  return request({
    url: `/task-service/task/taskInfo/${taskId}`,
    method: 'get'
  })
}
export function supplyAlertValue() {
  return request({
    url: '/task-service/task/supplyAlertValue',
    method: 'get'
  })
}
export function autoSupplyConfig(alertValue) {
  return request({
    url: '/task-service/task/autoSupplyConfig',
    method: 'post',
    data: alertValue
  })
}
