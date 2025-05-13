import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // TODO: 添加认证信息
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // TODO: 统一错误处理
    return Promise.reject(error)
  }
)

export default api

// 系统相关 API
export * from './system'

// 配置相关 API
export * from './config'
export * from './globalConfig'
export * from './pathsConfig'
export * from './sourcesConfig'

// 认证相关 API
export * from './auth'

// 连接相关 API
export * from './rtspConn'
export * from './rtmpConn'
export * from './webrtc'

// 录制相关 API
export * from './recordings'

// HLS 相关 API
export * from './hlsMuxer' 