import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as api from '@/api/pathsConfig'

interface PathConf {
  name: string
  [key: string]: any
}

export const usePathsConfigStore = defineStore('pathsConfig', () => {
  const list = ref<PathConf[]>([])
  const pageCount = ref(0)
  const itemCount = ref(0)
  const current = ref<PathConf | null>(null)
  const defaults = ref<PathConf | null>(null)
  const loading = ref(false)

  const fetchList = async (page = 0, itemsPerPage = 100) => {
    loading.value = true
    try {
      const res = await api.getPathsConfig(page, itemsPerPage) as any
      list.value = res.items || []
      pageCount.value = res.pageCount || 0
      itemCount.value = res.itemCount || 0
    } finally {
      loading.value = false
    }
  }

  const fetchOne = async (name: string) => {
    const res = await api.getPathConfig(name) as any
    current.value = res
    return res
  }

  const add = async (name: string, data: any) => {
    await api.addPathConfig(name, data)
    await fetchList()
  }

  const patch = async (name: string, data: any) => {
    await api.updatePathConfig(name, data)
    await fetchList()
  }

  const replace = async (name: string, data: any) => {
    await api.replacePathConfig(name, data)
    await fetchList()
  }

  const remove = async (name: string) => {
    await api.deletePathConfig(name)
    await fetchList()
  }

  const fetchDefaults = async () => {
    const res = await api.getPathConfigDefaults() as any
    defaults.value = res
  }

  const patchDefaults = async (data: any) => {
    await api.updatePathConfigDefaults(data)
    await fetchDefaults()
  }

  return {
    list,
    pageCount,
    itemCount,
    current,
    defaults,
    loading,
    fetchList,
    fetchOne,
    add,
    patch,
    replace,
    remove,
    fetchDefaults,
    patchDefaults
  }
})
