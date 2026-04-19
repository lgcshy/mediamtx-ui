import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getInfo, getPaths } from '@/api/system'
import { getRTSPConnections } from '@/api/rtspConn'
import { getRTSPSessions } from '@/api/rtspSession'
import { getRTMPConnections } from '@/api/rtmpConn'
import { getWebRTCSessions } from '@/api/webrtc'
import { listHlsMuxers } from '@/api/hlsMuxer'
import { getSRTConnections } from '@/api/srtConn'
import type { APIInfo, APIPath, APIListResponse } from '@/types/api'

interface ProtocolCounts {
  rtspConns: number
  rtspSessions: number
  rtmpConns: number
  webrtcSessions: number
  hlsMuxers: number
  srtConns: number
}

export const useSystemStore = defineStore('system', () => {
  const info = ref<APIInfo | null>(null)
  const paths = ref<APIPath[]>([])
  const pathCount = ref(0)
  const protocolCounts = ref<ProtocolCounts>({
    rtspConns: 0,
    rtspSessions: 0,
    rtmpConns: 0,
    webrtcSessions: 0,
    hlsMuxers: 0,
    srtConns: 0
  })
  const loading = ref(false)
  const connected = ref(false)

  const onlinePaths = computed(() => paths.value.filter(p => p.online))
  const totalReaders = computed(() =>
    paths.value.reduce((sum, p) => sum + (p.readers?.length || 0), 0)
  )

  // 计算源类型分布（从 path.source.type）
  const sourceTypeDistribution = computed(() => {
    const dist: Record<string, number> = {}
    for (const p of paths.value) {
      if (p.source) {
        const t = p.source.type
        dist[t] = (dist[t] || 0) + 1
      }
    }
    return dist
  })

  const fetchInfo = async () => {
    const res = await getInfo()
    info.value = res as unknown as APIInfo
    connected.value = true
  }

  const fetchPaths = async () => {
    const res = await getPaths(0, 1000) as unknown as APIListResponse<APIPath>
    paths.value = res.items || []
    pathCount.value = res.itemCount || 0
  }

  const fetchProtocolCounts = async () => {
    const results = await Promise.allSettled([
      getRTSPConnections(0, 0),
      getRTSPSessions(0, 0),
      getRTMPConnections(0, 0),
      getWebRTCSessions(0, 0),
      listHlsMuxers(0, 0),
      getSRTConnections(0, 0)
    ])

    const getCount = (r: PromiseSettledResult<any>) =>
      r.status === 'fulfilled' ? (r.value?.itemCount || 0) : 0

    protocolCounts.value = {
      rtspConns: getCount(results[0]),
      rtspSessions: getCount(results[1]),
      rtmpConns: getCount(results[2]),
      webrtcSessions: getCount(results[3]),
      hlsMuxers: getCount(results[4]),
      srtConns: getCount(results[5])
    }
  }

  const fetchAll = async () => {
    loading.value = true
    try {
      await Promise.all([fetchInfo(), fetchPaths(), fetchProtocolCounts()])
    } catch (error) {
      connected.value = false
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    info,
    paths,
    pathCount,
    protocolCounts,
    loading,
    connected,
    onlinePaths,
    totalReaders,
    sourceTypeDistribution,
    fetchInfo,
    fetchPaths,
    fetchProtocolCounts,
    fetchAll
  }
})
