import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getRTSPSessions, getRTSPSession, kickRTSPSession } from '@/api/rtspSession'
import type { APIRTSPSession, APIListResponse } from '@/types/api'

export const useRtspSessionStore = defineStore('rtspSession', () => {
  const list = ref<APIRTSPSession[]>([])
  const itemCount = ref(0)
  const loading = ref(false)

  const fetchList = async (page = 0, itemsPerPage = 100) => {
    loading.value = true
    try {
      const res = await getRTSPSessions(page, itemsPerPage) as unknown as APIListResponse<APIRTSPSession>
      list.value = res.items || []
      itemCount.value = res.itemCount || 0
    } finally {
      loading.value = false
    }
  }

  const fetchOne = async (id: string) => {
    const res = await getRTSPSession(id)
    return res as unknown as APIRTSPSession
  }

  const kick = async (id: string) => {
    await kickRTSPSession(id)
    list.value = list.value.filter(s => s.id !== id)
  }

  return { list, itemCount, loading, fetchList, fetchOne, kick }
})
