<template>
  <div class="recordings-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>录制文件列表</span>
          <el-button type="primary" @click="refreshRecordings">
            <el-icon><Refresh /></el-icon>
            刷新
          </el-button>
        </div>
      </template>

      <el-table :data="recordingsStore.list" style="width: 100%" v-loading="loading">
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="path" label="路径" />
        <el-table-column prop="created" label="创建时间">
          <template #default="{ row }">
            {{ formatDate(row.created) }}
          </template>
        </el-table-column>
        <el-table-column prop="size" label="大小">
          <template #default="{ row }">
            {{ formatSize(row.size) }}
          </template>
        </el-table-column>
        <el-table-column prop="duration" label="时长">
          <template #default="{ row }">
            {{ formatDuration(row.duration) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button-group>
              <el-button type="primary" @click="showDetails(row)">
                <el-icon><View /></el-icon>
                详情
              </el-button>
              <el-button type="success" @click="downloadRecording(row)">
                <el-icon><Download /></el-icon>
                下载
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 详情对话框 -->
    <el-dialog
      v-model="detailsVisible"
      title="录制文件详情"
      width="600px"
    >
      <el-descriptions :column="1" border>
        <el-descriptions-item label="名称">{{ selectedRecording?.name }}</el-descriptions-item>
        <el-descriptions-item label="路径">{{ selectedRecording?.path }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">
          {{ selectedRecording ? formatDate(selectedRecording.created) : '' }}
        </el-descriptions-item>
        <el-descriptions-item label="大小">
          {{ selectedRecording ? formatSize(selectedRecording.size) : '' }}
        </el-descriptions-item>
        <el-descriptions-item label="时长">
          {{ selectedRecording ? formatDuration(selectedRecording.duration) : '' }}
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRecordingsStore } from '@/stores/recordings'
import { ElMessage } from 'element-plus'
import { Refresh, View, Download } from '@element-plus/icons-vue'
import type { Recording } from '@/types/recording'

const recordingsStore = useRecordingsStore()
const loading = ref(false)
const detailsVisible = ref(false)
const selectedRecording = ref<Recording | null>(null)

// 刷新录制文件列表
const refreshRecordings = async () => {
  loading.value = true
  try {
    await recordingsStore.fetchRecordings()
  } catch (error) {
    ElMessage.error('获取录制文件列表失败')
  } finally {
    loading.value = false
  }
}

// 显示详情
const showDetails = (recording: Recording) => {
  selectedRecording.value = recording
  detailsVisible.value = true
}

// 下载录制文件
const downloadRecording = async (recording: Recording) => {
  try {
    loading.value = true
    const response = await recordingsStore.downloadRecording(recording.name)
    
    // 创建下载链接
    const url = window.URL.createObjectURL(new Blob([response]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', recording.name)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    
    ElMessage.success('下载成功')
  } catch (error) {
    ElMessage.error('下载失败')
  } finally {
    loading.value = false
  }
}

// 格式化日期
const formatDate = (date: string) => {
  return new Date(date).toLocaleString()
}

// 格式化文件大小
const formatSize = (size: number) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let index = 0
  let fileSize = size

  while (fileSize >= 1024 && index < units.length - 1) {
    fileSize /= 1024
    index++
  }

  return `${fileSize.toFixed(2)} ${units[index]}`
}

// 格式化时长
const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 3600)
  const minutes = Math.floor((duration % 3600) / 60)
  const seconds = Math.floor(duration % 60)

  const parts = []
  if (hours > 0) parts.push(`${hours}小时`)
  if (minutes > 0) parts.push(`${minutes}分钟`)
  if (seconds > 0) parts.push(`${seconds}秒`)

  return parts.join('') || '0秒'
}

onMounted(() => {
  refreshRecordings()
})
</script>

<style scoped>
.recordings-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-button-group {
  display: flex;
  gap: 8px;
}
</style> 