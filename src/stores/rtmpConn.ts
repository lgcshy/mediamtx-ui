import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getRtmpConnections, getRtmpConnection, closeRtmpConnection, closeAllRtmpConnections } from '@/api/rtmpConnConfig'

interface RtmpConnection {
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

export const useRtmpConnStore = defineStore('rtmpConn', () => {
  const list = ref<RtmpConnection[]>([])
  const loading = ref(false)

  // 获取连接列表
  const fetchList = async () => {
    loading.value = true
    try {
      const response = await getRtmpConnections()
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
      const response = await getRtmpConnection(id)
      return response
    } catch (error) {
      throw error
    }
  }

  // 关闭单个连接
  const closeConnection = async (id: string) => {
    loading.value = true
    try {
      await closeRtmpConnection(id)
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
      await closeAllRtmpConnections()
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