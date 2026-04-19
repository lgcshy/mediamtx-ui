import api from '@/api'

export const getSRTConnections = (page = 0, itemsPerPage = 100) =>
  api.get('/v3/srtconns/list', { params: { page, itemsPerPage } })

export const getSRTConnection = (id: string) =>
  api.get(`/v3/srtconns/get/${id}`)

export const kickSRTConnection = (id: string) =>
  api.post(`/v3/srtconns/kick/${id}`)
