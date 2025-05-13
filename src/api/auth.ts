import api from '@/api'

export const refreshJwks = () => api.post('/v3/auth/jwks/refresh')

// 获取认证用户列表
export const getAuthUsers = () => api.get('/v3/config/global/get').then(response => response?.data?.authInternalUsers || [])

// 添加认证用户
export const addAuthUser = (user: any) => api.patch('/v3/config/global/patch', { authInternalUsers: [user] })

// 更新认证用户
export const updateAuthUser = (username: string, user: any) => api.patch('/v3/config/global/patch', { authInternalUsers: [{ ...user, user: username }] })

// 删除认证用户
export const deleteAuthUser = (username: string) => api.get('/v3/config/global/get').then(response => {
  const users = response?.data?.authInternalUsers || []
  const updatedUsers = users.filter((u: any) => u.user !== username)
  return api.patch('/v3/config/global/patch', { authInternalUsers: updatedUsers })
}) 