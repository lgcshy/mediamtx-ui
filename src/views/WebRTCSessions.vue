<template>
  <div>
    <div class="page-header">
      <h1>WebRTC 会话 <el-tag size="small" round>{{ store.itemCount }}</el-tag></h1>
      <div class="page-actions">
        <el-switch v-model="autoRefreshCtrl.active.value" active-text="自动刷新" @change="autoRefreshCtrl.toggle" />
        <el-button :icon="Refresh" @click="loadData" :loading="store.loading">刷新</el-button>
      </div>
    </div>
    <el-card shadow="hover">
      <el-table :data="store.list" v-loading="store.loading" style="width: 100%">
        <el-table-column prop="id" label="ID" width="280" show-overflow-tooltip />
        <el-table-column label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.state === 'publish' ? 'danger' : 'success'" size="small">
              {{ formatState(row.state) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="path" label="路径" min-width="150" show-overflow-tooltip />
        <el-table-column prop="remoteAddr" label="远程地址" width="160" />
        <el-table-column label="PeerConn" width="90" align="center">
          <template #default="{ row }">
            <el-tag :type="row.peerConnectionEstablished ? 'success' : 'warning'" size="small">
              {{ row.peerConnectionEstablished ? '已建立' : '未建立' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="入站" width="100">
          <template #default="{ row }">{{ formatBytes(row.inboundBytes || 0) }}</template>
        </el-table-column>
        <el-table-column label="出站" width="100">
          <template #default="{ row }">{{ formatBytes(row.outboundBytes || 0) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="80" fixed="right">
          <template #default="{ row }">
            <el-popconfirm title="确定踢出此会话？" @confirm="handleKick(row.id)">
              <template #reference>
                <el-button text type="danger" size="small">踢出</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-empty v-if="!store.loading && store.list.length === 0" description="暂无 WebRTC 会话" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useWebRTCStore } from '@/stores/webrtc'
import { useAutoRefresh } from '@/composables/useAutoRefresh'
import { formatBytes, formatState } from '@/composables/useFormatters'
import { ElMessage } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'

const store = useWebRTCStore()
const loadData = () => store.fetchList()
const autoRefreshCtrl = useAutoRefresh(loadData)

const handleKick = async (id: string) => {
  try {
    await store.kick(id)
    ElMessage.success('已踢出')
  } catch {
    ElMessage.error('踢出失败')
  }
}

onMounted(loadData)
</script>
