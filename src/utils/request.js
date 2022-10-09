// 实现对axios
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'

// 通过axios创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(config => {
  config.headers['Authorization'] = store.getters.token
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
service.interceptors.response.use(function(response) {
  // console.log(response)
  return response
}, function(error) {
  Message({
    message: error.response.data,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})
service.interceptors.response.use()

export default service
