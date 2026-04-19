export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return '-'
  return d.toLocaleString('zh-CN')
}

export function formatUptime(startedStr: string | null | undefined): string {
  if (!startedStr) return '-'
  const started = new Date(startedStr)
  if (isNaN(started.getTime())) return '-'
  const now = Date.now()
  const diff = Math.floor((now - started.getTime()) / 1000)
  if (diff < 60) return `${diff}秒`
  if (diff < 3600) return `${Math.floor(diff / 60)}分${diff % 60}秒`
  if (diff < 86400) {
    const h = Math.floor(diff / 3600)
    const m = Math.floor((diff % 3600) / 60)
    return `${h}时${m}分`
  }
  const d = Math.floor(diff / 86400)
  const h = Math.floor((diff % 86400) / 3600)
  return `${d}天${h}时`
}

export function formatState(state: string): string {
  const map: Record<string, string> = {
    idle: '空闲',
    read: '读取',
    publish: '推流'
  }
  return map[state] || state
}

export function formatSourceType(type: string): string {
  const map: Record<string, string> = {
    rtspSource: 'RTSP 源',
    rtspSession: 'RTSP 会话',
    rtmpSource: 'RTMP 源',
    rtmpConn: 'RTMP 连接',
    rtmpsConn: 'RTMPS 连接',
    hlsSource: 'HLS 源',
    webRTCSession: 'WebRTC 会话',
    webRTCSource: 'WebRTC 源',
    srtConn: 'SRT 连接',
    srtSource: 'SRT 源',
    rtspsSession: 'RTSPS 会话',
    rpiCameraSource: 'RPi Camera',
    redirect: '重定向',
    mpegtsSource: 'MPEG-TS 源',
    rtpSource: 'RTP 源'
  }
  return map[type] || type
}
