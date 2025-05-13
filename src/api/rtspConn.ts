import api from '@/api'

// 获取 RTSP 连接列表
export const getRTSPConnections = () => {
  return api.get('/v3/rtspconns/list')
}

// 获取特定 RTSP 连接的详细信息
export const getRTSPConnection = (id: string) => {
  return api.get(`/v3/rtspconns/get/${id}`)
}

// 关闭特定 RTSP 连接
export const closeRTSPConnection = (id: string) => {
  return api.post(`/v3/rtspconns/close/${id}`)
}

// 关闭所有 RTSP 连接
export const closeAllRTSPConnections = () => {
  return api.post('/v3/rtspconns/closeall')
} 