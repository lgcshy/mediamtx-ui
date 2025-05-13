import { defineStore } from 'pinia'
import * as api from '@/api/pathsConfig'

interface PathConf {
  name: string
  source?: string
  [key: string]: any
}

interface PathConfList {
  pageCount: number
  itemCount: number
  items: PathConf[]
}

export const usePathsConfigStore = defineStore('pathsConfig', {
  state: () => ({
    list: [] as PathConf[],
    pageCount: 0,
    itemCount: 0,
    current: null as PathConf | null,
    defaults: null as PathConf | null
  }),
  actions: {
    async fetchList(page = 0, itemsPerPage = 100) {
      const res = await api.listPathConfigs(page, itemsPerPage)
      this.list = res.data.items
      this.pageCount = res.data.pageCount
      this.itemCount = res.data.itemCount
    },
    async fetchOne(name: string) {
      const res = await api.getPathConfig(name)
      this.current = res.data
    },
    async add(name: string, data: any) {
      await api.addPathConfig(name, data)
      await this.fetchList()
    },
    async patch(name: string, data: any) {
      await api.patchPathConfig(name, data)
      await this.fetchList()
    },
    async replace(name: string, data: any) {
      await api.replacePathConfig(name, data)
      await this.fetchList()
    },
    async remove(name: string) {
      await api.deletePathConfig(name)
      await this.fetchList()
    },
    async fetchDefaults() {
      const res = await api.getPathDefaults()
      this.defaults = res.data
    },
    async patchDefaults(data: any) {
      await api.patchPathDefaults(data)
      await this.fetchDefaults()
    }
  }
}) 