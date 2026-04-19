import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getSRTConnections, getSRTConnection, kickSRTConnection } from '@/api/srtConn'
import type { APISRTConn, APIListResponse } from '@/types/api'

export const useSrtConnStore = defineStore('srtConn', () => {
  const list = ref<APISRTConn[]>([])
  const itemCount = ref(0)
  const loading = ref(false)

  const fetchList = async (page = 0, itemsPerPage = 100) => {
    loading.value = true
    try {
      const res = await getSRTConnections(page, itemsPerPage) as unknown as APIListResponse<APISRTConn>
      list.value = res.items || []
      itemCount.value = res.itemCount || 0
    } finally {
      loading.value = false
    }
  }

  const fetchOne = async (id: string) => {
    const res = await getSRTConnection(id)
    return res as unknown as APISRTConn
  }

  const kick = async (id: string) => {
    await kickSRTConnection(id)
    list.value = list.value.filter(c => c.id !== id)
  }

  return { list, itemCount, loading, fetchList, fetchOne, kick }
})
