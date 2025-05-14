<template>
  <div class="home-container">
    <div class="page-header">
      <h1>系统仪表盘</h1>
      <el-button type="primary" @click="refreshData" :loading="systemStore.loading">
        <el-icon><Refresh /></el-icon>
        <span>刷新数据</span>
      </el-button>
    </div>

    <!-- 状态卡片 -->
    <el-row :gutter="20" class="status-cards">
      <el-col :xs="24" :sm="12" :md="12" :lg="6">
        <el-card class="status-card" shadow="hover">
          <div class="status-card-content">
            <div class="status-icon">
              <el-icon><Connection /></el-icon>
            </div>
            <div class="status-info">
              <div class="status-value">{{ systemStore.status?.pathCount || 0 }}</div>
              <div class="status-label">路径总数</div>
            </div>
          </div>
          <div class="status-footer">
            <span>活跃: {{ systemStore.pathStats?.active || 0 }}</span>
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :sm="12" :md="12" :lg="6">
        <el-card class="status-card" shadow="hover">
          <div class="status-card-content">
            <div class="status-icon source-icon">
              <el-icon><VideoPlay /></el-icon>
            </div>
            <div class="status-info">
              <div class="status-value">{{ systemStore.status?.sourceCount || 0 }}</div>
              <div class="status-label">源总数</div>
            </div>
          </div>
          <div class="status-footer">
            <span>活跃: {{ systemStore.sourceStats?.active || 0 }}</span>
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :sm="12" :md="12" :lg="6">
        <el-card class="status-card" shadow="hover">
          <div class="status-card-content">
            <div class="status-icon uptime-icon">
              <el-icon><Timer /></el-icon>
            </div>
            <div class="status-info">
              <div class="status-value">{{ formatUptime(systemStore.status?.uptime) }}</div>
              <div class="status-label">运行时间</div>
            </div>
          </div>
          <div class="status-footer">
            <span>版本: {{ systemStore.status?.version || 'Unknown' }}</span>
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :sm="12" :md="12" :lg="6">
        <el-card class="status-card" shadow="hover">
          <div class="status-card-content">
            <div class="status-icon system-icon">
              <el-icon><Monitor /></el-icon>
            </div>
            <div class="status-info">
              <div class="status-value">{{ systemStore.status?.cpuUsage || 0 }}%</div>
              <div class="status-label">CPU 使用率</div>
            </div>
          </div>
          <div class="status-footer">
            <span>内存: {{ systemStore.status?.memoryUsage || 0 }}%</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 协议分布 -->
    <el-row :gutter="20" class="mt-4">
      <el-col :xs="24" :md="12">
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <div class="card-header">
              <h3>协议分布</h3>
              <el-radio-group v-model="protocolChartType" size="small">
                <el-radio-button value="paths">路径</el-radio-button>
                <el-radio-button value="sources">源</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="protocol-chart">
            <div v-if="protocolChartType === 'paths'" class="protocol-stats">
              <div class="protocol-item">
                <div class="protocol-name">RTSP</div>
                <div class="protocol-bar-container">
                  <div class="protocol-bar rtsp" :style="{ width: getProtocolPercentage('rtsp', 'paths') }"></div>
                  <span class="protocol-value">{{ systemStore.pathStats?.rtsp || 0 }}</span>
                </div>
              </div>
              <div class="protocol-item">
                <div class="protocol-name">RTMP</div>
                <div class="protocol-bar-container">
                  <div class="protocol-bar rtmp" :style="{ width: getProtocolPercentage('rtmp', 'paths') }"></div>
                  <span class="protocol-value">{{ systemStore.pathStats?.rtmp || 0 }}</span>
                </div>
              </div>
              <div class="protocol-item">
                <div class="protocol-name">HLS</div>
                <div class="protocol-bar-container">
                  <div class="protocol-bar hls" :style="{ width: getProtocolPercentage('hls', 'paths') }"></div>
                  <span class="protocol-value">{{ systemStore.pathStats?.hls || 0 }}</span>
                </div>
              </div>
            </div>
            
            <div v-else class="protocol-stats">
              <div class="protocol-item">
                <div class="protocol-name">RTSP</div>
                <div class="protocol-bar-container">
                  <div class="protocol-bar rtsp" :style="{ width: getProtocolPercentage('rtsp', 'sources') }"></div>
                  <span class="protocol-value">{{ systemStore.sourceStats?.rtsp || 0 }}</span>
                </div>
              </div>
              <div class="protocol-item">
                <div class="protocol-name">RTMP</div>
                <div class="protocol-bar-container">
                  <div class="protocol-bar rtmp" :style="{ width: getProtocolPercentage('rtmp', 'sources') }"></div>
                  <span class="protocol-value">{{ systemStore.sourceStats?.rtmp || 0 }}</span>
                </div>
              </div>
              <div class="protocol-item">
                <div class="protocol-name">HLS</div>
                <div class="protocol-bar-container">
                  <div class="protocol-bar hls" :style="{ width: getProtocolPercentage('hls', 'sources') }"></div>
                  <span class="protocol-value">{{ systemStore.sourceStats?.hls || 0 }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :md="12">
        <el-card shadow="hover" class="system-card">
          <template #header>
            <div class="card-header">
              <h3>系统状态</h3>
              <el-tag type="success">在线</el-tag>
            </div>
          </template>
          <div class="system-status">
            <el-descriptions :column="1" border>
              <el-descriptions-item label="API 连接">
                <el-tag type="success">已连接</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="服务器地址">
                localhost:9997
              </el-descriptions-item>
              <el-descriptions-item label="最后更新">
                {{ new Date().toLocaleString() }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 最近路径和源 -->
    <el-row :gutter="20" class="mt-4">
      <el-col :xs="24" :md="12">
        <el-card shadow="hover" class="table-card">
          <template #header>
            <div class="card-header">
              <h3>最近路径</h3>
              <el-button type="primary" text @click="$router.push('/paths')">查看全部</el-button>
            </div>
          </template>
          <div class="responsive-table-container">
            <el-table :data="systemStore.paths.slice(0, 5)" style="width: 100%" v-loading="systemStore.loading">
              <el-table-column prop="name" label="名称" min-width="120" show-overflow-tooltip />
              <el-table-column prop="protocol" label="协议" width="80" />
              <el-table-column prop="status" label="状态" width="80">
                <template #default="{ row }">
                  <el-tag :type="row.status === 'active' ? 'success' : 'info'" size="small">
                    {{ row.status === 'active' ? '活跃' : '未激活' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="lastSeen" label="最后活动" width="180" class="hide-on-mobile" />
            </el-table>
          </div>
          <div v-if="systemStore.paths.length === 0" class="empty-data">
            <el-empty description="暂无路径数据" />
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :md="12">
        <el-card shadow="hover" class="table-card">
          <template #header>
            <div class="card-header">
              <h3>最近源</h3>
              <el-button type="primary" text @click="$router.push('/sources')">查看全部</el-button>
            </div>
          </template>
          <div class="responsive-table-container">
            <el-table :data="systemStore.sources.slice(0, 5)" style="width: 100%" v-loading="systemStore.loading">
              <el-table-column prop="name" label="名称" min-width="120" show-overflow-tooltip />
              <el-table-column prop="protocol" label="协议" width="80" />
              <el-table-column prop="status" label="状态" width="80">
                <template #default="{ row }">
                  <el-tag :type="row.status === 'active' ? 'success' : 'info'" size="small">
                    {{ row.status === 'active' ? '活跃' : '未激活' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="lastSeen" label="最后活动" width="180" class="hide-on-mobile" />
            </el-table>
          </div>
          <div v-if="systemStore.sources.length === 0" class="empty-data">
            <el-empty description="暂无源数据" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Refresh, Connection, VideoPlay, Timer, Monitor } from '@element-plus/icons-vue'
import { useSystemStore } from '@/stores/system'

const systemStore = useSystemStore()
const protocolChartType = ref('paths')

// 格式化运行时间
const formatUptime = (uptime: string | undefined) => {
  if (!uptime) return '未知'
  
  // 这里可以根据实际uptime格式进行处理
  return uptime
}

// 获取协议百分比
const getProtocolPercentage = (protocol: string, type: 'paths' | 'sources') => {
  const stats = type === 'paths' ? systemStore.pathStats : systemStore.sourceStats
  if (!stats) return '0%'
  
  const value = stats[protocol as keyof typeof stats] as number || 0
  const total = stats.total || 1 // 避免除以零
  
  return `${Math.round((value / total) * 100)}%`
}

const refreshData = async () => {
  try {
    await systemStore.fetchAll()
    ElMessage.success('数据已更新')
  } catch (error) {
    console.error('Failed to refresh data:', error)
    ElMessage.error('更新数据失败')
  }
}

// 测试 API 连接
const testApiConnection = async () => {
  try {
    const response = await systemStore.testApiConnection()
    console.log('API Connection Test:', response)
    ElMessage.success('API 连接成功')
  } catch (error) {
    console.error('API Connection Test Failed:', error)
    ElMessage.error('API 连接失败')
  }
}

onMounted(() => {
  testApiConnection() // 先测试 API 连接
  refreshData()
})
</script>

<style scoped>
.home-container {
  width: 100%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.status-cards {
  margin-bottom: 20px;
}

.status-card {
  height: 100%;
  transition: all 0.3s;
}

.status-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--el-box-shadow);
}

.status-card-content {
  display: flex;
  align-items: center;
}

.status-icon {
  font-size: 2.5rem;
  margin-right: 16px;
  color: var(--el-color-primary);
  background-color: rgba(24, 144, 255, 0.1);
  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.source-icon {
  color: var(--el-color-success);
  background-color: rgba(82, 196, 26, 0.1);
}

.uptime-icon {
  color: var(--el-color-warning);
  background-color: rgba(250, 140, 22, 0.1);
}

.system-icon {
  color: var(--el-color-danger);
  background-color: rgba(114, 46, 209, 0.1);
}

.status-info {
  flex: 1;
}

.status-value {
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 4px;
  color: var(--el-text-color-primary);
}

.status-label {
  font-size: 0.875rem;
  color: var(--el-text-color-secondary);
}

.status-footer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--el-border-color-light);
  font-size: 0.875rem;
  color: var(--el-text-color-secondary);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  font-size: 1.125rem;
}

.protocol-chart {
  padding: 16px 0;
}

.protocol-stats {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.protocol-item {
  display: flex;
  align-items: center;
}

.protocol-name {
  width: 60px;
  font-weight: 500;
}

.protocol-bar-container {
  flex: 1;
  height: 24px;
  background-color: var(--el-bg-color);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.protocol-bar {
  height: 100%;
  border-radius: 12px;
  transition: width 0.5s ease;
}

.protocol-bar.rtsp {
  background-color: var(--el-color-primary);
}

.protocol-bar.rtmp {
  background-color: var(--el-color-success);
}

.protocol-bar.hls {
  background-color: var(--el-color-warning);
}

.protocol-value {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  font-weight: 500;
}

.system-status {
  padding: 16px 0;
}

.empty-data {
  padding: 20px 0;
}

.chart-card, .system-card, .table-card {
  height: 100%;
}

.responsive-table-container {
  width: 100%;
  overflow-x: auto;
}

/* 响应式布局适配 */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 15px;
  }
  
  .page-header h1 {
    font-size: 1.25rem;
  }
  
  .status-icon {
    font-size: 2rem;
    width: 50px;
    height: 50px;
    margin-right: 12px;
  }
  
  .status-value {
    font-size: 1.5rem;
  }
  
  .status-footer {
    margin-top: 12px;
    padding-top: 12px;
  }
  
  .card-header h3 {
    font-size: 1rem;
  }
  
  .protocol-name {
    width: 50px;
  }
  
  .protocol-bar-container {
    height: 20px;
  }
  
  .hide-on-mobile {
    display: none;
  }
}

@media (max-width: 576px) {
  .status-icon {
    font-size: 1.75rem;
    width: 45px;
    height: 45px;
    margin-right: 10px;
  }
  
  .status-value {
    font-size: 1.25rem;
  }
  
  .protocol-name {
    width: 40px;
    font-size: 0.875rem;
  }
  
  .protocol-bar-container {
    height: 18px;
  }
  
  .protocol-value {
    font-size: 0.75rem;
    right: 8px;
  }
}
</style> 