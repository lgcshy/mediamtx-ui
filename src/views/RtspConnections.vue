<template>
  <div class="rtsp-connections">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>RTSP 连接列表</span>
          <div class="header-actions">
            <el-button type="primary" @click="refreshConnections">刷新</el-button>
            <el-button type="danger" @click="handleCloseAll">关闭所有连接</el-button>
          </div>
        </div>
      </template>

      <el-table :data="rtspConnStore.list" style="width: 100%" v-loading="rtspConnStore.loading">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="state" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.state === 'active' ? 'success' : 'info'">
              {{ row.state === 'active' ? '活跃' : '未激活' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="path" label="路径" />
        <el-table-column prop="created" label="创建时间">
          <template #default="{ row }">
            {{ formatDate(row.created) }}
          </template>
        </el-table-column>
        <el-table-column prop="bytesReceived" label="接收字节">
          <template #default="{ row }">
            {{ formatBytes(row.bytesReceived) }}
          </template>
        </el-table-column>
        <el-table-column prop="bytesSent" label="发送字节">
          <template #default="{ row }">
            {{ formatBytes(row.bytesSent) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button-group>
              <el-button type="primary" size="small" @click="showDetails(row)">
                详情
              </el-button>
              <el-button type="danger" size="small" @click="handleClose(row)">
                关闭
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 详情对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="连接详情"
      width="50%"
    >
      <el-descriptions :column="2" border>
        <el-descriptions-item label="ID">{{ currentConnection?.id }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="currentConnection?.state === 'active' ? 'success' : 'info'">
            {{ currentConnection?.state === 'active' ? '活跃' : '未激活' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="路径">{{ currentConnection?.path }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ formatDate(currentConnection?.created) }}</el-descriptions-item>
        <el-descriptions-item label="接收字节">{{ formatBytes(currentConnection?.bytesReceived) }}</el-descriptions-item>
        <el-descriptions-item label="发送字节">{{ formatBytes(currentConnection?.bytesSent) }}</el-descriptions-item>
        <el-descriptions-item label="客户端 IP">{{ currentConnection?.clientIP }}</el-descriptions-item>
        <el-descriptions-item label="客户端端口">{{ currentConnection?.clientPort }}</el-descriptions-item>
        <el-descriptions-item label="服务器 IP">{{ currentConnection?.serverIP }}</el-descriptions-item>
        <el-descriptions-item label="服务器端口">{{ currentConnection?.serverPort }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRtspConnStore } from '@/stores/rtspConn'

const rtspConnStore = useRtspConnStore()
const dialogVisible = ref(false)
const currentConnection = ref<any>(null)

// 刷新连接列表
const refreshConnections = async () => {
  try {
    await rtspConnStore.fetchList()
    ElMessage.success('连接列表已刷新')
  } catch (error) {
    ElMessage.error('刷新连接列表失败')
  }
}

// 显示连接详情
const showDetails = async (connection: any) => {
  try {
    currentConnection.value = await rtspConnStore.getConnection(connection.id)
    dialogVisible.value = true
  } catch (error) {
    ElMessage.error('获取连接详情失败')
  }
}

// 关闭单个连接
const handleClose = async (connection: any) => {
  try {
    await ElMessageBox.confirm(
      `确定要关闭连接 "${connection.id}" 吗？`,
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    await rtspConnStore.closeConnection(connection.id)
    ElMessage.success('连接已关闭')
    await refreshConnections()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('关闭连接失败')
    }
  }
}

// 关闭所有连接
const handleCloseAll = async () => {
  try {
    await ElMessageBox.confirm(
      '确定要关闭所有连接吗？',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    await rtspConnStore.closeAllConnections()
    ElMessage.success('所有连接已关闭')
    await refreshConnections()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('关闭所有连接失败')
    }
  }
}

// 格式化日期
const formatDate = (date: string) => {
  if (!date) return '-'
  return new Date(date).toLocaleString()
}

// 格式化字节数
const formatBytes = (bytes: number) => {
  if (!bytes) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let i = 0
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024
    i++
  }
  return `${bytes.toFixed(2)} ${units[i]}`
}

// 组件挂载时获取连接列表
onMounted(async () => {
  try {
    await rtspConnStore.fetchList()
  } catch (error) {
    ElMessage.error('获取连接列表失败')
  }
})
</script>

<style scoped>
.rtsp-connections {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  gap: 10px;
}

:deep(.el-descriptions) {
  margin: 20px 0;
}

:deep(.el-descriptions__label) {
  width: 120px;
}
</style> 