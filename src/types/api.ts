// Types matching MediaMTX v3 API (Go source: internal/defs/api*.go)

// Generic paginated list response
export interface APIListResponse<T> {
  itemCount: number
  pageCount: number
  items: T[]
}

// GET /v3/info
export interface APIInfo {
  version: string
  started: string // ISO 8601
}

// Source types from api_path.go
export type APIPathSourceType =
  | 'hlsSource'
  | 'redirect'
  | 'rpiCameraSource'
  | 'rtmpConn'
  | 'rtmpsConn'
  | 'rtmpSource'
  | 'rtspSession'
  | 'rtspSource'
  | 'rtspsSession'
  | 'srtConn'
  | 'srtSource'
  | 'mpegtsSource'
  | 'rtpSource'
  | 'webRTCSession'
  | 'webRTCSource'

export type APIPathReaderType =
  | 'hlsMuxer'
  | 'rtmpConn'
  | 'rtmpsConn'
  | 'rtspConn'
  | 'rpiCameraSecondary'
  | 'rtspSession'
  | 'rtspsConn'
  | 'rtspsSession'
  | 'srtConn'
  | 'webRTCSession'

export interface APIPathSource {
  type: APIPathSourceType
  id: string
}

export interface APIPathReader {
  type: APIPathReaderType
  id: string
}

export interface APIPathTrackCodecProps {
  [key: string]: unknown
}

export interface APIPathTrack {
  codec: string
  codecProps: APIPathTrackCodecProps
}

// GET /v3/paths/list, GET /v3/paths/get/:name
export interface APIPath {
  name: string
  confName: string
  available: boolean
  availableTime: string | null
  online: boolean
  onlineTime: string | null
  source: APIPathSource | null
  tracks2: APIPathTrack[]
  readers: APIPathReader[]
  inboundBytes: number
  outboundBytes: number
  inboundFramesInError: number
}

// RTSP Connections - GET /v3/rtspconns/list (read-only, no kick)
export interface APIRTSPConn {
  id: string
  created: string
  remoteAddr: string
  session: string | null
  tunnel: string
  inboundBytes: number
  outboundBytes: number
}

// RTSP Sessions - GET /v3/rtspsessions/list, kick supported
export type APIRTSPSessionState = 'idle' | 'read' | 'publish'

export interface APIRTSPSession {
  id: string
  created: string
  remoteAddr: string
  state: APIRTSPSessionState
  path: string
  query: string
  user: string
  transport: string | null
  profile: string | null
  conns: string[]
  inboundBytes: number
  inboundRTPPackets: number
  inboundRTPPacketsLost: number
  inboundRTPPacketsInError: number
  inboundRTPPacketsJitter: number
  inboundRTCPPackets: number
  inboundRTCPPacketsInError: number
  outboundBytes: number
  outboundRTPPackets: number
  outboundRTPPacketsReportedLost: number
  outboundRTPPacketsDiscarded: number
  outboundRTCPPackets: number
}

// RTMP Connections - GET /v3/rtmpconns/list, kick supported
export type APIRTMPConnState = 'idle' | 'read' | 'publish'

export interface APIRTMPConn {
  id: string
  created: string
  remoteAddr: string
  state: APIRTMPConnState
  path: string
  query: string
  user: string
  inboundBytes: number
  outboundBytes: number
  outboundFramesDiscarded: number
}

// WebRTC Sessions - GET /v3/webrtcsessions/list, kick supported
export type APIWebRTCSessionState = 'read' | 'publish'

export interface APIWebRTCSession {
  id: string
  created: string
  remoteAddr: string
  peerConnectionEstablished: boolean
  localCandidate: string
  remoteCandidate: string
  state: APIWebRTCSessionState
  path: string
  query: string
  user: string
  inboundBytes: number
  inboundRTPPackets: number
  inboundRTPPacketsLost: number
  inboundRTPPacketsJitter: number
  inboundRTCPPackets: number
  outboundBytes: number
  outboundRTPPackets: number
  outboundRTCPPackets: number
  outboundFramesDiscarded: number
}

// SRT Connections - GET /v3/srtconns/list, kick supported
export type APISRTConnState = 'idle' | 'read' | 'publish'

export interface APISRTConn {
  id: string
  created: string
  remoteAddr: string
  state: APISRTConnState
  path: string
  query: string
  user: string
  packetsSent: number
  packetsReceived: number
  packetsSentUnique: number
  packetsReceivedUnique: number
  packetsSendLoss: number
  packetsReceivedLoss: number
  packetsRetrans: number
  packetsReceivedRetrans: number
  packetsSentACK: number
  packetsReceivedACK: number
  packetsSentNAK: number
  packetsReceivedNAK: number
  bytesSent: number
  bytesReceived: number
  bytesSentUnique: number
  bytesReceivedUnique: number
  msRTT: number
  mbpsSendRate: number
  mbpsReceiveRate: number
  outboundFramesDiscarded: number
}

// HLS Muxers - GET /v3/hlsmuxers/list (read-only, no kick)
export interface APIHLSMuxer {
  path: string
  created: string
  lastRequest: string
  outboundBytes: number
  outboundFramesDiscarded: number
}

// Recordings - GET /v3/recordings/list
export interface APIRecordingSegment {
  start: string
}

export interface APIRecording {
  name: string
  segments: APIRecordingSegment[]
}
