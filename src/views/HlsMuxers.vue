<template>
  <div>
    <div class="page-header">
      <h1>HLS Muxers <el-tag size="small" round>{{ store.itemCount }}</el-tag></h1>
      <div class="page-actions">
        <el-switch v-model="autoRefreshCtrl.active.value" active-text="自动刷新" @change="autoRefreshCtrl.toggle" />
        <el-button :icon="Refresh" @click="loadData" :loading="store.loading">刷新</el-button>
      </div>
    </div>
    <el-card shadow="hover">
      <el-table :data="store.list" v-loading="store.loading" style="width: 100%">
        <el-table-column prop="path" label="路径" min-width="200" show-overflow-tooltip />
        <el-table-column label="出站流量" width="120">
          <template #default="{ row }">{{ formatBytes(row.outboundBytes || 0) }}</template>
        </el-table-column>
        <el-table-column label="丢弃帧" width="100" align="center">
          <template #default="{ row }">{{ row.outboundFramesDiscarded || 0 }}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="170">
          <template #default="{ row }">{{ formatDate(row.created) }}</template>
        </el-table-column>
        <el-table-column label="最后请求" width="170">
          <template #default="{ row }">{{ formatDate(row.lastRequest) }}</template>
        </el-table-column>
      </el-table>
      <el-empty v-if="!store.loading && store.list.length === 0" description="暂无 HLS Muxer" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useHlsMuxerStore } from '@/stores/hlsMuxer'
import { useAutoRefresh } from '@/composables/useAutoRefresh'
import { formatBytes, formatDate } from '@/composables/useFormatters'
import { Refresh } from '@element-plus/icons-vue'

const store = useHlsMuxerStore()
const loadData = () => store.fetchList()
const autoRefreshCtrl = useAutoRefresh(loadData)
onMounted(loadData)
</script>
