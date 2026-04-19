import api from '@/api'

export const getRTSPSessions = (page = 0, itemsPerPage = 100) =>
  api.get('/v3/rtspsessions/list', { params: { page, itemsPerPage } })

export const getRTSPSession = (id: string) =>
  api.get(`/v3/rtspsessions/get/${id}`)

export const kickRTSPSession = (id: string) =>
  api.post(`/v3/rtspsessions/kick/${id}`)
