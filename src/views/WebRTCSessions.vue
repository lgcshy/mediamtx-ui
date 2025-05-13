<template>
  <div class="webrtc-sessions">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>WebRTC 会话列表</span>
          <el-button type="primary" @click="refreshSessions">刷新</el-button>
        </div>
      </template>

      <div v-if="error" class="error-message">
        <el-alert
          title="获取数据失败"
          type="error"
          :description="errorMessage"
          show-icon
          :closable="false"
        />
      </div>

      <el-empty v-else-if="!loading && (!webrtcStore.list || webrtcStore.list.length === 0)" description="暂无会话数据" />

      <el-table v-else :data="webrtcStore.list" style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="state" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.state === 'read' ? 'success' : 'info'">
              {{ row.state === 'read' ? '读取' : row.state === 'publish' ? '发布' : '未知' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="path" label="路径" />
        <el-table-column prop="created" label="创建时间" />
        <el-table-column prop="bytesReceived" label="接收字节" />
        <el-table-column prop="bytesSent" label="发送字节" />
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button type="primary" link @click="showDetails(row)">
              详情
            </el-button>
            <el-button type="danger" link @click="confirmKickSession(row)">
              断开
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 详情对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="会话详情"
      width="50%"
    >
      <el-descriptions :column="2" border v-if="currentSession">
        <el-descriptions-item label="ID">{{ currentSession?.id }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="currentSession?.state === 'read' ? 'success' : 'info'">
            {{ currentSession?.state === 'read' ? '读取' : currentSession?.state === 'publish' ? '发布' : '未知' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="路径">{{ currentSession?.path }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ currentSession?.created }}</el-descriptions-item>
        <el-descriptions-item label="接收字节">{{ currentSession?.bytesReceived }}</el-descriptions-item>
        <el-descriptions-item label="发送字节">{{ currentSession?.bytesSent }}</el-descriptions-item>
        <el-descriptions-item label="远程地址">{{ currentSession?.remoteAddr }}</el-descriptions-item>
        <el-descriptions-item label="查询参数">{{ currentSession?.query || '无' }}</el-descriptions-item>
      </el-descriptions>
      <div v-else class="dialog-empty">
        <el-empty description="无法获取详细信息" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useWebRTCStore } from '@/stores/webrtc'

const webrtcStore = useWebRTCStore()
const loading = ref(false)
const dialogVisible = ref(false)
const currentSession = ref<any>(null)
const error = ref(false)
const errorMessage = ref('')

const refreshSessions = async () => {
  loading.value = true
  error.value = false
  errorMessage.value = ''
  
  try {
    await webrtcStore.fetchList()
    ElMessage.success('会话列表刷新成功')
  } catch (err: any) {
    console.error('Failed to fetch WebRTC sessions:', err)
    error.value = true
    errorMessage.value = err?.message || '未知错误'
    ElMessage.error('会话列表刷新失败')
  } finally {
    loading.value = false
  }
}

const showDetails = async (session: any) => {
  try {
    currentSession.value = await webrtcStore.getSession(session.id)
    dialogVisible.value = true
  } catch (err: any) {
    console.error('Failed to fetch session details:', err)
    ElMessage.error(`获取会话详情失败: ${err?.message || '未知错误'}`)
  }
}

const confirmKickSession = (session: any) => {
  ElMessageBox.confirm(
    `确定要断开 ID 为 ${session.id} 的会话吗？`,
    '断开会话',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    kickSession(session)
  }).catch(() => {
    ElMessage.info('已取消操作')
  })
}

const kickSession = async (session: any) => {
  try {
    await webrtcStore.kickSession(session.id)
    ElMessage.success('会话已断开')
  } catch (err: any) {
    console.error('Failed to kick session:', err)
    ElMessage.error(`断开会话失败: ${err?.message || '未知错误'}`)
  }
}

onMounted(() => {
  refreshSessions()
})
</script>

<style scoped>
.webrtc-sessions {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.error-message {
  margin: 20px 0;
}

.dialog-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
}

:deep(.el-descriptions) {
  margin: 20px 0;
}

:deep(.el-descriptions__label) {
  width: 120px;
}
</style> 