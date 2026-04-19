import api from '@/api'

export const refreshJwks = () => api.post('/v3/auth/jwks/refresh')
