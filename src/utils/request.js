// 实现对axios
import store from '@/store'
import axios from 'axios'

// 通过axios创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址
  timeout: 5000 // request timeout
})

service.interceptors.request.use(config => {
  config.headers['Authorization'] = `${store.getters.token}`
  return config
})
// 请求拦截器
service.interceptors.response.use()

export default service
