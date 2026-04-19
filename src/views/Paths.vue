<template>
  <div>
    <div class="page-header">
      <h1>路径状态</h1>
      <div class="page-actions">
        <el-input v-model="search" placeholder="搜索路径" clearable style="width: 200px" :prefix-icon="Search" />
        <el-button :icon="Refresh" @click="loadData" :loading="store.loading">刷新</el-button>
      </div>
    </div>

    <el-card shadow="hover">
      <el-table :data="filteredList" v-loading="store.loading" style="width: 100%">
        <el-table-column prop="name" label="路径名称" min-width="180" show-overflow-tooltip />
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-tag :type="row.online ? 'success' : row.available ? 'warning' : 'info'" size="small">
              {{ row.online ? '在线' : row.available ? '可用' : '离线' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="源类型" width="130">
          <template #default="{ row }">
            {{ row.source ? formatSourceType(row.source.type) : '-' }}
          </template>
        </el-table-column>
        <el-table-column label="轨道" width="80" align="center">
          <template #default="{ row }">{{ row.tracks2?.length || 0 }}</template>
        </el-table-column>
        <el-table-column label="读取者" width="80" align="center">
          <template #default="{ row }">{{ row.readers?.length || 0 }}</template>
        </el-table-column>
        <el-table-column label="入站" width="110">
          <template #default="{ row }">{{ formatBytes(row.inboundBytes || 0) }}</template>
        </el-table-column>
        <el-table-column label="出站" width="110">
          <template #default="{ row }">{{ formatBytes(row.outboundBytes || 0) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="80" fixed="right">
          <template #default="{ row }">
            <el-button text type="primary" size="small" @click="showDetail(row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-empty v-if="!store.loading && filteredList.length === 0" description="暂无路径" />
    </el-card>

    <el-drawer v-model="drawerVisible" :title="currentPath?.name" size="450px">
      <el-descriptions :column="1" border v-if="currentPath">
        <el-descriptions-item label="路径名称">{{ currentPath.name }}</el-descriptions-item>
        <el-descriptions-item label="配置名称">{{ currentPath.confName }}</el-descriptions-item>
        <el-descriptions-item label="在线">
          <el-tag :type="currentPath.online ? 'success' : 'info'" size="small">
            {{ currentPath.online ? '是' : '否' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="源类型">
          {{ currentPath.source ? formatSourceType(currentPath.source.type) : '无' }}
        </el-descriptions-item>
        <el-descriptions-item label="入站流量">{{ formatBytes(currentPath.inboundBytes || 0) }}</el-descriptions-item>
        <el-descriptions-item label="出站流量">{{ formatBytes(currentPath.outboundBytes || 0) }}</el-descriptions-item>
      </el-descriptions>
      <template v-if="currentPath?.tracks2?.length">
        <h4 style="margin: 16px 0 8px">轨道</h4>
        <el-tag v-for="(t, i) in currentPath.tracks2" :key="i" style="margin: 0 4px 4px 0">{{ t.codec }}</el-tag>
      </template>
      <template v-if="currentPath?.readers?.length">
        <h4 style="margin: 16px 0 8px">读取者</h4>
        <el-tag v-for="(r, i) in currentPath.readers" :key="i" type="success" style="margin: 0 4px 4px 0">{{ r.type }}</el-tag>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePathsStore } from '@/stores/paths'
import { formatBytes, formatSourceType } from '@/composables/useFormatters'
import { Refresh, Search } from '@element-plus/icons-vue'
import type { APIPath } from '@/types/api'

const store = usePathsStore()
const search = ref('')
const drawerVisible = ref(false)
const currentPath = ref<APIPath | null>(null)

const filteredList = computed(() => {
  if (!search.value) return store.list
  const s = search.value.toLowerCase()
  return store.list.filter(p => p.name.toLowerCase().includes(s))
})

const showDetail = (row: APIPath) => {
  currentPath.value = row
  drawerVisible.value = true
}

const loadData = () => store.fetchList()
onMounted(loadData)
</script>
