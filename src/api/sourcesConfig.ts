import api from '@/api'

// 获取所有源（分页可选）- 使用paths/list端点
export const getSources = (page = 0, itemsPerPage = 100) =>
  api.get('/v3/paths/list', { params: { page, itemsPerPage } })

// 获取特定源的配置 - 使用paths/get端点
export const getSourceConfig = (name: string) =>
  api.get(`/v3/paths/get/${encodeURIComponent(name)}`)

// 获取特定源的配置（从配置路径）
export const getSourcePathConfig = (name: string) =>
  api.get(`/v3/config/paths/get/${encodeURIComponent(name)}`)

// 添加源配置
export const addSourceConfig = (name: string, config: any) =>
  api.post(`/v3/config/paths/add/${encodeURIComponent(name)}`, config)

// 更新特定源的配置
export const updateSourceConfig = (name: string, config: any) =>
  api.patch(`/v3/config/paths/patch/${encodeURIComponent(name)}`, config)

// 删除特定源的配置
export const deleteSourceConfig = (name: string) =>
  api.delete(`/v3/config/paths/delete/${encodeURIComponent(name)}`) 