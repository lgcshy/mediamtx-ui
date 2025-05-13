import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getSources, getSourceConfig, updateSourceConfig, deleteSourceConfig } from '@/api/sourcesConfig'

interface Source {
  name: string
  url: string
  protocol: string
  status: string
  created: string
  lastSeen: string
  bytesReceived: number
  bytesSent: number
  readers: number
  publishers: number
}

interface SourcesResponse {
  items: Source[]
  pageCount: number
  itemCount: number
}

export const useSourcesStore = defineStore('sources', () => {
  const list = ref<Source[]>([])
  const loading = ref(false)

  // 获取源列表
  const fetchList = async () => {
    loading.value = true
    try {
      const response = await getSources()
      const sourcesResponse = response as unknown as SourcesResponse
      list.value = sourcesResponse.items || []
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 获取源配置
  const getSource = async (name: string) => {
    try {
      const response = await getSourceConfig(name)
      return response as unknown as Source
    } catch (error) {
      throw error
    }
  }

  // 添加源
  const addSource = async (source: Partial<Source>) => {
    loading.value = true
    try {
      await updateSourceConfig(source.name!, source)
      await fetchList()
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 更新源
  const updateSource = async (name: string, source: Partial<Source>) => {
    loading.value = true
    try {
      await updateSourceConfig(name, source)
      await fetchList()
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 删除源
  const deleteSource = async (name: string) => {
    loading.value = true
    try {
      await deleteSourceConfig(name)
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
    getSource,
    addSource,
    updateSource,
    deleteSource
  }
}) 