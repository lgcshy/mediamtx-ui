import api from '@/api'

export const listHlsMuxers = (page = 0, itemsPerPage = 100) => api.get('/v3/hlsmuxers/list', { params: { page, itemsPerPage } })
export const getHlsMuxer = (name: string) => api.get(`/v3/hlsmuxers/get/${encodeURIComponent(name)}`) 