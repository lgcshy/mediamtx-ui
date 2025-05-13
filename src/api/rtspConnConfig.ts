import api from '@/api'

// 获取 RTSP 连接列表
export const getRtspConnections = () => {
  return api.get('/v3/rtspconns/list')
}

// 获取特定 RTSP 连接的详细信息
export const getRtspConnection = (id: string) => {
  return api.get(`/v3/rtspconns/get/${id}`)
}

// 关闭特定 RTSP 连接
export const closeRtspConnection = (id: string) => {
  return api.post(`/v3/rtspconns/close/${id}`)
}

// 关闭所有 RTSP 连接
export const closeAllRtspConnections = () => {
  return api.post('/v3/rtspconns/closeall')
} 