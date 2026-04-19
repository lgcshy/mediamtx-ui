import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getGlobalConfig, updateGlobalConfig } from '@/api/globalConfig'

export const useConfigStore = defineStore('config', () => {
  const config = ref<Record<string, any>>({})
  const loading = ref(false)

  const fetchConfig = async () => {
    loading.value = true
    try {
      const res = await getGlobalConfig()
      config.value = res as any
    } finally {
      loading.value = false
    }
  }

  const saveConfig = async (data: Record<string, any>) => {
    loading.value = true
    try {
      await updateGlobalConfig(data)
      await fetchConfig()
    } finally {
      loading.value = false
    }
  }

  return { config, loading, fetchConfig, saveConfig }
})
