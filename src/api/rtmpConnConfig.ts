import api from '@/api'

// 获取 RTMP 连接列表
export const getRtmpConnections = () => {
  return api.get('/v3/rtmpconns/list')
}

// 获取特定 RTMP 连接的详细信息
export const getRtmpConnection = (id: string) => {
  return api.get(`/v3/rtmpconns/get/${id}`)
}

// 关闭特定 RTMP 连接
export const closeRtmpConnection = (id: string) => {
  return api.post(`/v3/rtmpconns/close/${id}`)
}

// 关闭所有 RTMP 连接
export const closeAllRtmpConnections = () => {
  return api.post('/v3/rtmpconns/closeall')
} 