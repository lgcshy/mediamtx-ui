import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const api = axios.create({
  baseURL: '',  // 移除 /api 前缀，因为已经在 vite.config.ts 中配置了代理
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    console.log('Request:', config.method?.toUpperCase(), config.url)
    // 在这里可以添加认证信息等
    return config
  },
  (error) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    console.log('Response:', response.config.url, response.status)
    return response.data
  },
  (error) => {
    console.error('Response Error:', error.config?.url, error.response?.status)
    if (error.response) {
      switch (error.response.status) {
        case 404:
          ElMessage.error(`请求的资源不存在: ${error.config?.url}`)
          break
        case 500:
          ElMessage.error('服务器内部错误')
          break
        default:
          ElMessage.error(error.response.data?.message || '请求失败')
      }
    } else if (error.request) {
      ElMessage.error('无法连接到服务器')
    } else {
      ElMessage.error('请求配置错误')
    }
    return Promise.reject(error)
  }
)

export default api 