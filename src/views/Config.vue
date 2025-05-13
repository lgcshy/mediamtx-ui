<template>
  <div class="config">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>全局配置</span>
          <div class="header-actions">
            <el-button type="primary" @click="refreshConfig">刷新</el-button>
            <el-button type="success" @click="saveConfig">保存配置</el-button>
            <el-button type="warning" @click="resetToDefaults">重置为默认值</el-button>
          </div>
        </div>
      </template>

      <el-tabs v-model="activeTab" type="border-card">
        <!-- 基本配置 -->
        <el-tab-pane label="基本配置" name="general">
          <el-form :model="configStore.config" label-width="180px" :rules="rules">
            <el-form-item label="日志级别" prop="logLevel">
              <el-select v-model="configStore.config.logLevel" style="width: 100%">
                <el-option label="DEBUG" value="debug" />
                <el-option label="INFO" value="info" />
                <el-option label="WARN" value="warn" />
                <el-option label="ERROR" value="error" />
              </el-select>
            </el-form-item>
            <el-form-item label="日志文件" prop="logFile">
              <el-input v-model="configStore.config.logFile" />
            </el-form-item>
            <el-form-item label="系统日志前缀" prop="sysLogPrefix">
              <el-input v-model="configStore.config.sysLogPrefix" />
            </el-form-item>
            <el-form-item label="读取超时" prop="readTimeout">
              <el-input v-model="configStore.config.readTimeout" />
            </el-form-item>
            <el-form-item label="写入超时" prop="writeTimeout">
              <el-input v-model="configStore.config.writeTimeout" />
            </el-form-item>
            <el-form-item label="写入队列大小" prop="writeQueueSize">
              <el-input-number v-model="configStore.config.writeQueueSize" :min="1" style="width: 100%" />
            </el-form-item>
            <el-form-item label="UDP 最大负载大小" prop="udpMaxPayloadSize">
              <el-input-number v-model="configStore.config.udpMaxPayloadSize" :min="1" style="width: 100%" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 认证配置 -->
        <el-tab-pane label="认证配置" name="auth">
          <el-form :model="configStore.config" label-width="180px">
            <el-form-item label="认证方法" prop="authMethod">
              <el-select v-model="configStore.config.authMethod" style="width: 100%">
                <el-option label="无" value="" />
                <el-option label="内部" value="internal" />
                <el-option label="HTTP" value="http" />
                <el-option label="JWT" value="jwt" />
              </el-select>
            </el-form-item>
            <el-form-item label="HTTP 认证地址" prop="authHTTPAddress">
              <el-input v-model="configStore.config.authHTTPAddress" />
            </el-form-item>
            <el-form-item label="JWT JWKS" prop="authJWTJWKS">
              <el-input v-model="configStore.config.authJWTJWKS" />
            </el-form-item>
            <el-form-item label="JWT 声明键" prop="authJWTClaimKey">
              <el-input v-model="configStore.config.authJWTClaimKey" />
            </el-form-item>
            <el-form-item label="JWT 在 HTTP 查询中" prop="authJWTInHTTPQuery">
              <el-switch v-model="configStore.config.authJWTInHTTPQuery" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- RTSP 配置 -->
        <el-tab-pane label="RTSP 配置" name="rtsp">
          <el-form :model="configStore.config" label-width="180px">
            <el-form-item label="启用 RTSP" prop="rtsp">
              <el-switch v-model="configStore.config.rtsp" />
            </el-form-item>
            <el-form-item label="RTSP 传输" prop="rtspTransports">
              <el-select v-model="configStore.config.rtspTransports" multiple style="width: 100%">
                <el-option label="TCP" value="tcp" />
                <el-option label="UDP" value="udp" />
              </el-select>
            </el-form-item>
            <el-form-item label="RTSP 加密" prop="rtspEncryption">
              <el-select v-model="configStore.config.rtspEncryption" style="width: 100%">
                <el-option label="无" value="no" />
                <el-option label="可选" value="optional" />
                <el-option label="必需" value="required" />
              </el-select>
            </el-form-item>
            <el-form-item label="RTSP 地址" prop="rtspAddress">
              <el-input v-model="configStore.config.rtspAddress" />
            </el-form-item>
            <el-form-item label="RTSPS 地址" prop="rtspsAddress">
              <el-input v-model="configStore.config.rtspsAddress" />
            </el-form-item>
            <el-form-item label="RTP 地址" prop="rtpAddress">
              <el-input v-model="configStore.config.rtpAddress" />
            </el-form-item>
            <el-form-item label="RTCP 地址" prop="rtcpAddress">
              <el-input v-model="configStore.config.rtcpAddress" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- RTMP 配置 -->
        <el-tab-pane label="RTMP 配置" name="rtmp">
          <el-form :model="configStore.config" label-width="180px">
            <el-form-item label="启用 RTMP" prop="rtmp">
              <el-switch v-model="configStore.config.rtmp" />
            </el-form-item>
            <el-form-item label="RTMP 地址" prop="rtmpAddress">
              <el-input v-model="configStore.config.rtmpAddress" />
            </el-form-item>
            <el-form-item label="RTMP 加密" prop="rtmpEncryption">
              <el-select v-model="configStore.config.rtmpEncryption" style="width: 100%">
                <el-option label="无" value="no" />
                <el-option label="可选" value="optional" />
                <el-option label="必需" value="required" />
              </el-select>
            </el-form-item>
            <el-form-item label="RTMPS 地址" prop="rtmpsAddress">
              <el-input v-model="configStore.config.rtmpsAddress" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- HLS 配置 -->
        <el-tab-pane label="HLS 配置" name="hls">
          <el-form :model="configStore.config" label-width="180px">
            <el-form-item label="启用 HLS" prop="hls">
              <el-switch v-model="configStore.config.hls" />
            </el-form-item>
            <el-form-item label="HLS 地址" prop="hlsAddress">
              <el-input v-model="configStore.config.hlsAddress" />
            </el-form-item>
            <el-form-item label="HLS 加密" prop="hlsEncryption">
              <el-switch v-model="configStore.config.hlsEncryption" />
            </el-form-item>
            <el-form-item label="HLS 允许来源" prop="hlsAllowOrigin">
              <el-input v-model="configStore.config.hlsAllowOrigin" />
            </el-form-item>
            <el-form-item label="HLS 始终重混流" prop="hlsAlwaysRemux">
              <el-switch v-model="configStore.config.hlsAlwaysRemux" />
            </el-form-item>
            <el-form-item label="HLS 变体" prop="hlsVariant">
              <el-select v-model="configStore.config.hlsVariant" style="width: 100%">
                <el-option label="MPEGTS" value="mpegts" />
                <el-option label="FMP4" value="fmp4" />
              </el-select>
            </el-form-item>
            <el-form-item label="HLS 分段数量" prop="hlsSegmentCount">
              <el-input-number v-model="configStore.config.hlsSegmentCount" :min="1" style="width: 100%" />
            </el-form-item>
            <el-form-item label="HLS 分段时长" prop="hlsSegmentDuration">
              <el-input v-model="configStore.config.hlsSegmentDuration" />
            </el-form-item>
            <el-form-item label="HLS 部分时长" prop="hlsPartDuration">
              <el-input v-model="configStore.config.hlsPartDuration" />
            </el-form-item>
            <el-form-item label="HLS 分段最大大小" prop="hlsSegmentMaxSize">
              <el-input v-model="configStore.config.hlsSegmentMaxSize" />
            </el-form-item>
            <el-form-item label="HLS 目录" prop="hlsDirectory">
              <el-input v-model="configStore.config.hlsDirectory" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- API 配置 -->
        <el-tab-pane label="API 配置" name="api">
          <el-form :model="configStore.config" label-width="180px">
            <el-form-item label="启用 API" prop="api">
              <el-switch v-model="configStore.config.api" />
            </el-form-item>
            <el-form-item label="API 地址" prop="apiAddress">
              <el-input v-model="configStore.config.apiAddress" />
            </el-form-item>
            <el-form-item label="API 加密" prop="apiEncryption">
              <el-switch v-model="configStore.config.apiEncryption" />
            </el-form-item>
            <el-form-item label="API 允许来源" prop="apiAllowOrigin">
              <el-input v-model="configStore.config.apiAllowOrigin" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 指标配置 -->
        <el-tab-pane label="指标配置" name="metrics">
          <el-form :model="configStore.config" label-width="180px">
            <el-form-item label="启用指标" prop="metrics">
              <el-switch v-model="configStore.config.metrics" />
            </el-form-item>
            <el-form-item label="指标地址" prop="metricsAddress">
              <el-input v-model="configStore.config.metricsAddress" />
            </el-form-item>
            <el-form-item label="指标加密" prop="metricsEncryption">
              <el-switch v-model="configStore.config.metricsEncryption" />
            </el-form-item>
            <el-form-item label="指标允许来源" prop="metricsAllowOrigin">
              <el-input v-model="configStore.config.metricsAllowOrigin" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useConfigStore } from '@/stores/config'
import { ElMessage } from 'element-plus'

const configStore = useConfigStore()
const activeTab = ref('general')

// 表单验证规则
const rules = {
  logLevel: [{ required: true, message: '请选择日志级别', trigger: 'change' }],
  readTimeout: [{ required: true, message: '请输入读取超时', trigger: 'blur' }],
  writeTimeout: [{ required: true, message: '请输入写入超时', trigger: 'blur' }],
  writeQueueSize: [{ required: true, message: '请输入写入队列大小', trigger: 'blur' }],
  udpMaxPayloadSize: [{ required: true, message: '请输入 UDP 最大负载大小', trigger: 'blur' }]
}

// 刷新配置
const refreshConfig = async () => {
  try {
    await configStore.fetchConfig()
    ElMessage.success('配置已刷新')
  } catch (error) {
    ElMessage.error('刷新配置失败')
  }
}

// 保存配置
const saveConfig = async () => {
  try {
    await configStore.updateConfig(configStore.config)
    ElMessage.success('配置已保存')
  } catch (error) {
    ElMessage.error('保存配置失败')
  }
}

// 重置为默认值
const resetToDefaults = async () => {
  try {
    await configStore.resetToDefaults()
    ElMessage.success('配置已重置为默认值')
  } catch (error) {
    ElMessage.error('重置配置失败')
  }
}

// 初始化
onMounted(async () => {
  try {
    await refreshConfig()
  } catch (error) {
    ElMessage.error('加载配置失败')
  }
})
</script>

<style scoped>
.config {
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

:deep(.el-tabs__content) {
  padding: 20px;
}

:deep(.el-form-item) {
  margin-bottom: 22px;
}

:deep(.el-input-number) {
  width: 100%;
}
</style> 