import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getRtspConnections, getRtspConnection, closeRtspConnection, closeAllRtspConnections } from '@/api/rtspConnConfig'

interface RtspConnection {
  id: string
  state: string
  path: string
  created: string
  bytesReceived: number
  bytesSent: number
  clientIP: string
  clientPort: number
  serverIP: string
  serverPort: number
}

export const useRtspConnStore = defineStore('rtspConn', () => {
  const list = ref<RtspConnection[]>([])
  const loading = ref(false)

  // 获取连接列表
  const fetchList = async () => {
    loading.value = true
    try {
      const response = await getRtspConnections()
      list.value = response.items
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 获取连接详情
  const getConnection = async (id: string) => {
    try {
      const response = await getRtspConnection(id)
      return response
    } catch (error) {
      throw error
    }
  }

  // 关闭单个连接
  const closeConnection = async (id: string) => {
    loading.value = true
    try {
      await closeRtspConnection(id)
      await fetchList()
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 关闭所有连接
  const closeAllConnections = async () => {
    loading.value = true
    try {
      await closeAllRtspConnections()
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
    getConnection,
    closeConnection,
    closeAllConnections
  }
}) 