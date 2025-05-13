import api from '@/api'

// 获取所有路径配置（分页可选）
export const getPathsConfig = (page = 0, itemsPerPage = 100) =>
  api.get('/v3/config/paths/list', { params: { page, itemsPerPage } })

// 获取特定路径的配置
export const getPathConfig = (name: string) =>
  api.get(`/v3/config/paths/get/${encodeURIComponent(name)}`)

// 添加路径配置
export const addPathConfig = (name: string, config: any) =>
  api.post(`/v3/config/paths/add/${encodeURIComponent(name)}`, config)

// 更新特定路径的配置
export const updatePathConfig = (name: string, config: any) =>
  api.patch(`/v3/config/paths/patch/${encodeURIComponent(name)}`, config)

// 替换特定路径的配置
export const replacePathConfig = (name: string, config: any) =>
  api.post(`/v3/config/paths/replace/${encodeURIComponent(name)}`, config)

// 删除特定路径的配置
export const deletePathConfig = (name: string) =>
  api.delete(`/v3/config/paths/delete/${encodeURIComponent(name)}`)

// 获取路径配置的默认值
export const getPathConfigDefaults = () =>
  api.get('/v3/config/pathdefaults/get')

// 更新路径配置的默认值
export const updatePathConfigDefaults = (config: any) =>
  api.patch('/v3/config/pathdefaults/patch', config)

// 获取路径配置的示例
export const getPathConfigExample = () => {
  return api.get('/v3/config/pathdefaults/example')
} 