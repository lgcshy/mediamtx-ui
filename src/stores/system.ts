import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getSystemStatus, getPathStats, getSourceStats, getPaths } from '@/api/system'
import { getSources } from '@/api/sourcesConfig'

interface SystemStatus {
  version: string
  uptime: string
  cpuUsage: number
  memoryUsage: number
  pathCount: number
  sourceCount: number
}

interface PathStats {
  total: number
  active: number
  rtsp: number
  rtmp: number
  hls: number
}

interface SourceStats {
  total: number
  active: number
  rtsp: number
  rtmp: number
  hls: number
}

interface Path {
  name: string
  url: string
  protocol: string
  status: string
  created: string
  lastSeen: string
  bytesReceived: number
  bytesSent: number
}

interface Source {
  name: string
  url: string
  protocol: string
  status: string
  created: string
  lastSeen: string
  bytesReceived: number
  bytesSent: number
}

interface PathsResponse {
  items: Path[]
  pageCount: number
  itemCount: number
}

interface SourcesResponse {
  items: Source[]
  pageCount: number
  itemCount: number
}

export const useSystemStore = defineStore('system', () => {
  const status = ref<SystemStatus | null>(null)
  const pathStats = ref<PathStats | null>(null)
  const sourceStats = ref<SourceStats | null>(null)
  const paths = ref<Path[]>([])
  const sources = ref<Source[]>([])
  const loading = ref(false)

  // 测试 API 连接
  const testApiConnection = async () => {
    try {
      const response = await getSystemStatus()
      return response
    } catch (error) {
      throw error
    }
  }

  // 获取系统状态 - 从路径列表生成简单状态
  const fetchStatus = async () => {
    try {
      const response = await getSystemStatus()
      const pathsResponse = response as unknown as PathsResponse
      
      // 创建简单的系统状态
      status.value = {
        version: 'Unknown', // MediaMTX API不提供版本信息
        uptime: new Date().toISOString(),
        cpuUsage: 0, // 不可用
        memoryUsage: 0, // 不可用
        pathCount: pathsResponse.itemCount || 0,
        sourceCount: pathsResponse.itemCount || 0
      }
    } catch (error) {
      throw error
    }
  }

  // 获取路径统计 - 从路径列表计算
  const fetchPathStats = async () => {
    try {
      const response = await getPathStats()
      const pathsResponse = response as unknown as PathsResponse
      const items = pathsResponse.items || []
      
      // 计算统计数据
      const total = items.length
      const active = items.filter(item => item.status === 'ready').length
      
      // 按协议分类（这里需要根据实际数据结构调整）
      const rtsp = items.filter(item => item.protocol?.includes('rtsp')).length
      const rtmp = items.filter(item => item.protocol?.includes('rtmp')).length
      const hls = items.filter(item => item.protocol?.includes('hls')).length
      
      pathStats.value = {
        total,
        active,
        rtsp,
        rtmp,
        hls
      }
    } catch (error) {
      throw error
    }
  }

  // 获取源统计 - 从路径列表计算
  const fetchSourceStats = async () => {
    try {
      const response = await getSourceStats()
      const pathsResponse = response as unknown as PathsResponse
      const items = pathsResponse.items || []
      
      // 计算统计数据
      const total = items.length
      const active = items.filter(item => item.status === 'ready').length
      
      // 按协议分类（这里需要根据实际数据结构调整）
      const rtsp = items.filter(item => item.protocol?.includes('rtsp')).length
      const rtmp = items.filter(item => item.protocol?.includes('rtmp')).length
      const hls = items.filter(item => item.protocol?.includes('hls')).length
      
      sourceStats.value = {
        total,
        active,
        rtsp,
        rtmp,
        hls
      }
    } catch (error) {
      throw error
    }
  }

  // 获取路径列表
  const fetchPaths = async () => {
    try {
      const response = await getPaths()
      const pathsResponse = response as unknown as PathsResponse
      paths.value = pathsResponse.items || []
    } catch (error) {
      throw error
    }
  }

  // 获取源列表
  const fetchSources = async () => {
    try {
      const response = await getSources()
      const sourcesResponse = response as unknown as SourcesResponse
      sources.value = sourcesResponse.items || []
    } catch (error) {
      throw error
    }
  }

  // 获取所有数据
  const fetchAll = async () => {
    loading.value = true
    try {
      await Promise.all([
        fetchStatus(),
        fetchPathStats(),
        fetchSourceStats(),
        fetchPaths(),
        fetchSources()
      ])
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    status,
    pathStats,
    sourceStats,
    paths,
    sources,
    loading,
    testApiConnection,
    fetchStatus,
    fetchPathStats,
    fetchSourceStats,
    fetchPaths,
    fetchSources,
    fetchAll
  }
}) 