import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000
})

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
)

export default api

export * from './system'
export * from './globalConfig'
export * from './pathsConfig'
export * from './auth'
export * from './rtspConn'
export * from './rtspSession'
export * from './rtmpConn'
export * from './srtConn'
export * from './webrtc'
export * from './hlsMuxer'
export * from './recordings'
