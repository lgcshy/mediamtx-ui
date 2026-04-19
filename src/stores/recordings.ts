import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listRecordings, getRecording, deleteRecordingSegment } from '@/api/recordings'
import type { APIRecording, APIListResponse } from '@/types/api'

export const useRecordingsStore = defineStore('recordings', () => {
  const list = ref<APIRecording[]>([])
  const itemCount = ref(0)
  const loading = ref(false)

  const fetchList = async (page = 0, itemsPerPage = 100) => {
    loading.value = true
    try {
      const res = await listRecordings(page, itemsPerPage) as unknown as APIListResponse<APIRecording>
      list.value = res.items || []
      itemCount.value = res.itemCount || 0
    } finally {
      loading.value = false
    }
  }

  const fetchOne = async (name: string) => {
    const res = await getRecording(name)
    return res as unknown as APIRecording
  }

  const deleteSegment = async (path: string, start: string) => {
    await deleteRecordingSegment(path, start)
    await fetchList()
  }

  return { list, itemCount, loading, fetchList, fetchOne, deleteSegment }
})
