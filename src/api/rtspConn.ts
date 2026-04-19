import api from '@/api'

// RTSP 连接是只读的，不可关闭（只有 Sessions 可以 kick）

export const getRTSPConnections = (page = 0, itemsPerPage = 100) =>
  api.get('/v3/rtspconns/list', { params: { page, itemsPerPage } })

export const getRTSPConnection = (id: string) =>
  api.get(`/v3/rtspconns/get/${id}`)
