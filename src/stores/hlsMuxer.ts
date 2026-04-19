import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listHlsMuxers, getHlsMuxer } from '@/api/hlsMuxer'
import type { APIHLSMuxer, APIListResponse } from '@/types/api'

export const useHlsMuxerStore = defineStore('hlsMuxer', () => {
  const list = ref<APIHLSMuxer[]>([])
  const itemCount = ref(0)
  const loading = ref(false)

  const fetchList = async (page = 0, itemsPerPage = 100) => {
    loading.value = true
    try {
      const res = await listHlsMuxers(page, itemsPerPage) as unknown as APIListResponse<APIHLSMuxer>
      list.value = res.items || []
      itemCount.value = res.itemCount || 0
    } finally {
      loading.value = false
    }
  }

  const fetchOne = async (name: string) => {
    const res = await getHlsMuxer(name)
    return res as unknown as APIHLSMuxer
  }

  // HLS Muxers 不支持 kick/close 操作
  return { list, itemCount, loading, fetchList, fetchOne }
})
