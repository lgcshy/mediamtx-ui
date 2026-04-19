import api from '@/api'

// 获取服务器信息（版本、启动时间）
export const getInfo = () => api.get('/v3/info')

// 获取所有路径（分页可选）
export const getPaths = (page = 0, itemsPerPage = 100) =>
  api.get('/v3/paths/list', { params: { page, itemsPerPage } })

// 获取单个路径
export const getPath = (name: string) =>
  api.get(`/v3/paths/get/${encodeURIComponent(name)}`)
