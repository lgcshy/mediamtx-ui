import api from '@/api'

// 获取系统状态（使用可用的端点代替）
export const getSystemStatus = () => {
  // 使用一个确定存在的端点来检测API连接
  return api.get('/v3/paths/list')
}

// 获取路径统计（使用实际可用的端点）
export const getPathStats = () => {
  // 使用路径列表端点，然后在前端计算统计数据
  return api.get('/v3/paths/list')
}

// 获取源统计（使用实际可用的端点）
export const getSourceStats = () => {
  // 使用路径列表端点，然后在前端计算统计数据
  return api.get('/v3/paths/list')
}

// 获取所有路径（分页可选）
export const getPaths = (page = 0, itemsPerPage = 100) =>
  api.get('/v3/paths/list', { params: { page, itemsPerPage } })

// 获取单个路径
export const getPath = (name: string) =>
  api.get(`/v3/paths/get/${encodeURIComponent(name)}`)

// 测试 API 连接
export const testApiConnection = () => {
  // 使用一个确定存在的端点来测试连接
  return api.get('/v3/paths/list')
} 