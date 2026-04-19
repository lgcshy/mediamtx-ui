import api from '@/api'

export const getRTMPConnections = (page = 0, itemsPerPage = 100) =>
  api.get('/v3/rtmpconns/list', { params: { page, itemsPerPage } })

export const getRTMPConnection = (id: string) =>
  api.get(`/v3/rtmpconns/get/${id}`)

export const kickRTMPConnection = (id: string) =>
  api.post(`/v3/rtmpconns/kick/${id}`)
