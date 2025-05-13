import api from '@/api'

// 获取 WebRTC 会话列表
export const getWebRTCSessions = (page?: number, itemsPerPage?: number) => {
  return api.get('/v3/webrtcsessions/list', {
    params: {
      page,
      itemsPerPage
    }
  })
}

// 获取特定 WebRTC 会话的详细信息
export const getWebRTCSession = (id: string) => {
  return api.get(`/v3/webrtcsessions/get/${id}`)
}

// 关闭特定 WebRTC 会话
export const closeWebRTCSession = (id: string) => {
  return api.post(`/v3/webrtcsessions/kick/${id}`)
}

// 关闭所有 WebRTC 会话 (MediaMTX API 没有提供这个端点，这里保留接口但不实际使用)
export const closeAllWebRTCSessions = () => {
  throw new Error('MediaMTX API does not support closing all WebRTC sessions at once')
} 