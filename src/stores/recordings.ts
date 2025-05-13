import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listRecordings, getRecording } from '@/api/recordings'
import type { Recording } from '@/types/recording'

export const useRecordingsStore = defineStore('recordings', () => {
  const list = ref<Recording[]>([])
  const loading = ref(false)

  // 获取录制文件列表
  const fetchRecordings = async () => {
    loading.value = true
    try {
      const response = await listRecordings()
      list.value = response.items
    } finally {
      loading.value = false
    }
  }

  // 获取单个录制文件详情
  const fetchRecording = async (name: string) => {
    try {
      const response = await getRecording(name)
      return response
    } catch (error) {
      throw error
    }
  }

  // 下载录制文件
  const downloadRecording = async (name: string) => {
    try {
      const response = await fetch(`/api/v3/recordings/${name}/download`, {
        method: 'GET',
        headers: {
          'Accept': 'application/octet-stream'
        }
      })

      if (!response.ok) {
        throw new Error('下载失败')
      }

      return await response.blob()
    } catch (error) {
      throw error
    }
  }

  return {
    list,
    loading,
    fetchRecordings,
    fetchRecording,
    downloadRecording
  }
}) 