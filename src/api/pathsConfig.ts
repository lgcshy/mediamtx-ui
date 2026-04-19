import api from '@/api'

export const getPathsConfig = (page = 0, itemsPerPage = 100) =>
  api.get('/v3/config/paths/list', { params: { page, itemsPerPage } })

export const getPathConfig = (name: string) =>
  api.get(`/v3/config/paths/get/${encodeURIComponent(name)}`)

export const addPathConfig = (name: string, config: any) =>
  api.post(`/v3/config/paths/add/${encodeURIComponent(name)}`, config)

export const updatePathConfig = (name: string, config: any) =>
  api.patch(`/v3/config/paths/patch/${encodeURIComponent(name)}`, config)

export const replacePathConfig = (name: string, config: any) =>
  api.post(`/v3/config/paths/replace/${encodeURIComponent(name)}`, config)

export const deletePathConfig = (name: string) =>
  api.delete(`/v3/config/paths/delete/${encodeURIComponent(name)}`)

export const getPathConfigDefaults = () =>
  api.get('/v3/config/pathdefaults/get')

export const updatePathConfigDefaults = (config: any) =>
  api.patch('/v3/config/pathdefaults/patch', config)
