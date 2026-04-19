import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getRTSPConnections, getRTSPConnection } from '@/api/rtspConn'
import type { APIRTSPConn, APIListResponse } from '@/types/api'

export const useRtspConnStore = defineStore('rtspConn', () => {
  const list = ref<APIRTSPConn[]>([])
  const itemCount = ref(0)
  const loading = ref(false)

  const fetchList = async (page = 0, itemsPerPage = 100) => {
    loading.value = true
    try {
      const res = await getRTSPConnections(page, itemsPerPage) as unknown as APIListResponse<APIRTSPConn>
      list.value = res.items || []
      itemCount.value = res.itemCount || 0
    } finally {
      loading.value = false
    }
  }

  const fetchOne = async (id: string) => {
    const res = await getRTSPConnection(id)
    return res as unknown as APIRTSPConn
  }

  return { list, itemCount, loading, fetchList, fetchOne }
})
