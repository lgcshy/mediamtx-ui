import api from '@/api'

export const listRecordings = (page = 0, itemsPerPage = 100) =>
  api.get('/v3/recordings/list', { params: { page, itemsPerPage } })

export const getRecording = (name: string) =>
  api.get(`/v3/recordings/get/${encodeURIComponent(name)}`) 