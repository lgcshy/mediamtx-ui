import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getPathsConfig, getPathConfig, updatePathConfig, deletePathConfig } from '@/api/pathsConfig'

interface Path {
  name: string
  source: string
  protocol: string
  status: string
  created: string
  lastSeen: string
  bytesReceived: number
  bytesSent: number
  readers: number
  publishers: number
}

export const usePathsStore = defineStore('paths', () => {
  const list = ref<Path[]>([])
  const loading = ref(false)

  // 获取路径列表
  const fetchList = async () => {
    loading.value = true
    try {
      const response = await getPathsConfig()
      list.value = response.items
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 获取路径配置
  const getPath = async (name: string) => {
    try {
      const response = await getPathConfig(name)
      return response
    } catch (error) {
      throw error
    }
  }

  // 添加路径
  const addPath = async (path: Partial<Path>) => {
    loading.value = true
    try {
      await updatePathConfig(path.name!, path)
      await fetchList()
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 更新路径
  const updatePath = async (name: string, path: Partial<Path>) => {
    loading.value = true
    try {
      await updatePathConfig(name, path)
      await fetchList()
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 删除路径
  const deletePath = async (name: string) => {
    loading.value = true
    try {
      await deletePathConfig(name)
      await fetchList()
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    list,
    loading,
    fetchList,
    getPath,
    addPath,
    updatePath,
    deletePath
  }
}) 