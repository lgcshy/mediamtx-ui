import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getPaths, getPath } from '@/api/system'
import type { APIPath, APIListResponse } from '@/types/api'

export const usePathsStore = defineStore('paths', () => {
  const list = ref<APIPath[]>([])
  const pageCount = ref(0)
  const itemCount = ref(0)
  const loading = ref(false)

  const fetchList = async (page = 0, itemsPerPage = 100) => {
    loading.value = true
    try {
      const res = await getPaths(page, itemsPerPage) as unknown as APIListResponse<APIPath>
      list.value = res.items || []
      pageCount.value = res.pageCount || 0
      itemCount.value = res.itemCount || 0
    } finally {
      loading.value = false
    }
  }

  const fetchOne = async (name: string) => {
    const res = await getPath(name)
    return res as unknown as APIPath
  }

  return {
    list,
    pageCount,
    itemCount,
    loading,
    fetchList,
    fetchOne
  }
})
