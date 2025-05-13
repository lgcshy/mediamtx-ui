import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getGlobalConfig, updateGlobalConfig, getGlobalConfigDefaults, getGlobalConfigExample } from '@/api/globalConfig'

interface AuthInternalUserPermission {
  action: string
  path: string
}

interface AuthInternalUser {
  user: string
  pass: string
  ips: string[]
  permissions: AuthInternalUserPermission[]
}

interface GlobalConfig {
  // General
  logLevel: string
  logDestinations: string[]
  logFile: string
  sysLogPrefix: string
  readTimeout: string
  writeTimeout: string
  writeQueueSize: number
  udpMaxPayloadSize: number
  runOnConnect: string
  runOnConnectRestart: boolean
  runOnDisconnect: string

  // Authentication
  authMethod: string
  authInternalUsers: AuthInternalUser[]
  authHTTPAddress: string
  authHTTPExclude: AuthInternalUserPermission[]
  authJWTJWKS: string
  authJWTJWKSFingerprint: string
  authJWTClaimKey: string
  authJWTExclude: AuthInternalUserPermission[]
  authJWTInHTTPQuery: boolean

  // Control API
  api: boolean
  apiAddress: string
  apiEncryption: boolean
  apiServerKey: string
  apiServerCert: string
  apiAllowOrigin: string
  apiTrustedProxies: string[]

  // Metrics
  metrics: boolean
  metricsAddress: string
  metricsEncryption: boolean
  metricsServerKey: string
  metricsServerCert: string
  metricsAllowOrigin: string
  metricsTrustedProxies: string[]

  // PPROF
  pprof: boolean
  pprofAddress: string
  pprofEncryption: boolean
  pprofServerKey: string
  pprofServerCert: string
  pprofAllowOrigin: string
  pprofTrustedProxies: string[]

  // Playback server
  playback: boolean
  playbackAddress: string
  playbackEncryption: boolean
  playbackServerKey: string
  playbackServerCert: string
  playbackAllowOrigin: string
  playbackTrustedProxies: string[]

  // RTSP server
  rtsp: boolean
  rtspTransports: string[]
  rtspEncryption: string
  rtspAddress: string
  rtspsAddress: string
  rtpAddress: string
  rtcpAddress: string
  multicastIPRange: string
  multicastRTPPort: number
  multicastRTCPPort: number
  rtspServerKey: string
  rtspServerCert: string
  rtspAuthMethods: string[]

  // RTMP server
  rtmp: boolean
  rtmpAddress: string
  rtmpEncryption: string
  rtmpsAddress: string
  rtmpServerKey: string
  rtmpServerCert: string

  // HLS server
  hls: boolean
  hlsAddress: string
  hlsEncryption: boolean
  hlsServerKey: string
  hlsServerCert: string
  hlsAllowOrigin: string
  hlsTrustedProxies: string[]
  hlsAlwaysRemux: boolean
  hlsVariant: string
  hlsSegmentCount: number
  hlsSegmentDuration: string
  hlsPartDuration: string
  hlsSegmentMaxSize: string
  hlsDirectory: string
}

export const useConfigStore = defineStore('config', () => {
  const config = ref<GlobalConfig>({
    // General
    logLevel: 'info',
    logDestinations: [],
    logFile: '',
    sysLogPrefix: '',
    readTimeout: '',
    writeTimeout: '',
    writeQueueSize: 0,
    udpMaxPayloadSize: 0,
    runOnConnect: '',
    runOnConnectRestart: false,
    runOnDisconnect: '',

    // Authentication
    authMethod: '',
    authInternalUsers: [],
    authHTTPAddress: '',
    authHTTPExclude: [],
    authJWTJWKS: '',
    authJWTJWKSFingerprint: '',
    authJWTClaimKey: '',
    authJWTExclude: [],
    authJWTInHTTPQuery: false,

    // Control API
    api: true,
    apiAddress: '',
    apiEncryption: false,
    apiServerKey: '',
    apiServerCert: '',
    apiAllowOrigin: '',
    apiTrustedProxies: [],

    // Metrics
    metrics: false,
    metricsAddress: '',
    metricsEncryption: false,
    metricsServerKey: '',
    metricsServerCert: '',
    metricsAllowOrigin: '',
    metricsTrustedProxies: [],

    // PPROF
    pprof: false,
    pprofAddress: '',
    pprofEncryption: false,
    pprofServerKey: '',
    pprofServerCert: '',
    pprofAllowOrigin: '',
    pprofTrustedProxies: [],

    // Playback server
    playback: false,
    playbackAddress: '',
    playbackEncryption: false,
    playbackServerKey: '',
    playbackServerCert: '',
    playbackAllowOrigin: '',
    playbackTrustedProxies: [],

    // RTSP server
    rtsp: true,
    rtspTransports: ['tcp', 'udp'],
    rtspEncryption: 'no',
    rtspAddress: '',
    rtspsAddress: '',
    rtpAddress: '',
    rtcpAddress: '',
    multicastIPRange: '',
    multicastRTPPort: 0,
    multicastRTCPPort: 0,
    rtspServerKey: '',
    rtspServerCert: '',
    rtspAuthMethods: [],

    // RTMP server
    rtmp: true,
    rtmpAddress: '',
    rtmpEncryption: 'no',
    rtmpsAddress: '',
    rtmpServerKey: '',
    rtmpServerCert: '',

    // HLS server
    hls: true,
    hlsAddress: '',
    hlsEncryption: false,
    hlsServerKey: '',
    hlsServerCert: '',
    hlsAllowOrigin: '',
    hlsTrustedProxies: [],
    hlsAlwaysRemux: false,
    hlsVariant: 'mpegts',
    hlsSegmentCount: 3,
    hlsSegmentDuration: '',
    hlsPartDuration: '',
    hlsSegmentMaxSize: '',
    hlsDirectory: ''
  })
  const loading = ref(false)
  const defaults = ref<GlobalConfig | null>(null)
  const example = ref<GlobalConfig | null>(null)

  // 获取全局配置
  const fetchConfig = async () => {
    loading.value = true
    try {
      const response = await getGlobalConfig()
      config.value = response
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 更新全局配置
  const updateConfig = async (newConfig: Partial<GlobalConfig>) => {
    loading.value = true
    try {
      const response = await updateGlobalConfig(newConfig)
      config.value = response
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 获取默认配置
  const fetchDefaults = async () => {
    try {
      const response = await getGlobalConfigDefaults()
      defaults.value = response
    } catch (error) {
      throw error
    }
  }

  // 获取示例配置
  const fetchExample = async () => {
    try {
      const response = await getGlobalConfigExample()
      example.value = response
    } catch (error) {
      throw error
    }
  }

  // 重置配置为默认值
  const resetToDefaults = async () => {
    if (!defaults.value) {
      await fetchDefaults()
    }
    if (defaults.value) {
      await updateConfig(defaults.value)
    }
  }

  return {
    config,
    loading,
    defaults,
    example,
    fetchConfig,
    updateConfig,
    fetchDefaults,
    fetchExample,
    resetToDefaults
  }
}) 