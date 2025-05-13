import api from '@/api'

// 获取全局配置
export const getGlobalConfig = () => api.get('/v3/config/global/get')

// 更新全局配置
export const updateGlobalConfig = (config: any) => api.patch('/v3/config/global/patch', config)

// 获取全局配置的默认值（使用get接口，因为MediaMTX API没有提供默认配置端点）
export const getGlobalConfigDefaults = () => api.get('/v3/config/global/get')

// 获取全局配置的示例（使用get接口，因为MediaMTX API没有提供示例配置端点）
export const getGlobalConfigExample = () => {
  return api.get('/v3/config/global/get')
} 