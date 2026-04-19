import api from '@/api'

export const getWebRTCSessions = (page = 0, itemsPerPage = 100) =>
  api.get('/v3/webrtcsessions/list', { params: { page, itemsPerPage } })

export const getWebRTCSession = (id: string) =>
  api.get(`/v3/webrtcsessions/get/${id}`)

export const kickWebRTCSession = (id: string) =>
  api.post(`/v3/webrtcsessions/kick/${id}`)
