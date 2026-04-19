import { ref, onUnmounted, type Ref } from 'vue'

export type PlayerState = 'idle' | 'connecting' | 'connected' | 'error' | 'reconnecting'

interface UseWebRTCPlayerOptions {
  onError?: (err: string) => void
  onStateChange?: (state: PlayerState) => void
}

/**
 * WHEP-based WebRTC player composable.
 * Ported from MediaMTX reader.js with full codec negotiation and auto-reconnect.
 */
export function useWebRTCPlayer(
  videoRef: Ref<HTMLVideoElement | null>,
  options: UseWebRTCPlayerOptions = {}
) {
  const state = ref<PlayerState>('idle')
  const error = ref('')

  const RETRY_PAUSE = 2000

  let pc: RTCPeerConnection | null = null
  let sessionUrl: string | null = null
  let offerData: { iceUfrag: string; icePwd: string; medias: string[] } | null = null
  let queuedCandidates: RTCIceCandidate[] = []
  let restartTimeout: ReturnType<typeof setTimeout> | null = null
  let nonAdvertisedCodecs: string[] = []
  let currentUrl = ''
  let closed = false

  function setState(s: PlayerState) {
    state.value = s
    options.onStateChange?.(s)
  }

  // --- Codec helpers (ported from reader.js) ---

  function reservePayloadType(payloadTypes: string[]): string {
    for (let i = 30; i <= 127; i++) {
      if ((i <= 63 || i >= 96) && !payloadTypes.includes(i.toString())) {
        const pl = i.toString()
        payloadTypes.push(pl)
        return pl
      }
    }
    throw new Error('unable to find a free payload type')
  }

  function supportsNonAdvertisedCodec(codec: string, fmtp?: string): Promise<boolean> {
    return new Promise((resolve) => {
      const tmpPc = new RTCPeerConnection({ iceServers: [] })
      tmpPc.addTransceiver('audio', { direction: 'recvonly' })
      tmpPc.createOffer()
        .then((offer) => {
          if (!offer.sdp || offer.sdp.includes(` ${codec}`)) {
            throw new Error('already present or no sdp')
          }
          const sections = offer.sdp.split('m=audio')
          const payloadTypes = sections.slice(1)
            .map((s) => s.split('\r\n')[0].split(' ').slice(3))
            .reduce((prev, cur) => [...prev, ...cur], [])
          const pt = reservePayloadType(payloadTypes)
          const lines = sections[1].split('\r\n')
          lines[0] += ` ${pt}`
          lines.splice(lines.length - 1, 0, `a=rtpmap:${pt} ${codec}`)
          if (fmtp) lines.splice(lines.length - 1, 0, `a=fmtp:${pt} ${fmtp}`)
          sections[1] = lines.join('\r\n')
          offer.sdp = sections.join('m=audio')
          return tmpPc.setLocalDescription(offer)
        })
        .then(() => tmpPc.setRemoteDescription(new RTCSessionDescription({
          type: 'answer',
          sdp: 'v=0\r\no=- 0 0 IN IP4 0.0.0.0\r\ns=-\r\nt=0 0\r\n'
            + 'a=fingerprint:sha-256 00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00\r\n'
            + `m=audio 9 UDP/TLS/RTP/SAVPF ${reservePayloadType([])}\r\n`
            + 'c=IN IP4 0.0.0.0\r\na=ice-pwd:x\r\na=ice-ufrag:x\r\na=sendonly\r\na=rtcp-mux\r\n'
        })))
        .then(() => resolve(true))
        .catch(() => resolve(false))
        .finally(() => tmpPc.close())
    })
  }

  function enableStereoOpus(section: string): string {
    let opusPt = ''
    const lines = section.split('\r\n')
    for (const line of lines) {
      if (line.startsWith('a=rtpmap:') && line.toLowerCase().includes('opus/')) {
        opusPt = line.slice('a=rtpmap:'.length).split(' ')[0]
        break
      }
    }
    if (!opusPt) return section
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith(`a=fmtp:${opusPt} `)) {
        if (!lines[i].includes('stereo')) lines[i] += ';stereo=1'
        if (!lines[i].includes('sprop-stereo')) lines[i] += ';sprop-stereo=1'
      }
    }
    return lines.join('\r\n')
  }

  function enableStereoPcmau(payloadTypes: string[], section: string): string {
    const lines = section.split('\r\n')
    let pt = reservePayloadType(payloadTypes)
    lines[0] += ` ${pt}`
    lines.splice(lines.length - 1, 0, `a=rtpmap:${pt} PCMU/8000/2`, `a=rtcp-fb:${pt} transport-cc`)
    pt = reservePayloadType(payloadTypes)
    lines[0] += ` ${pt}`
    lines.splice(lines.length - 1, 0, `a=rtpmap:${pt} PCMA/8000/2`, `a=rtcp-fb:${pt} transport-cc`)
    return lines.join('\r\n')
  }

  function enableMultichannelOpus(payloadTypes: string[], section: string): string {
    const lines = section.split('\r\n')
    const configs = [
      { ch: 3, mapping: '0,2,1', streams: 2, coupled: 1 },
      { ch: 4, mapping: '0,1,2,3', streams: 2, coupled: 2 },
      { ch: 5, mapping: '0,4,1,2,3', streams: 3, coupled: 2 },
      { ch: 6, mapping: '0,4,1,2,3,5', streams: 4, coupled: 2 },
      { ch: 7, mapping: '0,4,1,2,3,5,6', streams: 4, coupled: 4 },
      { ch: 8, mapping: '0,6,1,4,5,2,3,7', streams: 5, coupled: 4 },
    ]
    for (const c of configs) {
      const pt = reservePayloadType(payloadTypes)
      lines[0] += ` ${pt}`
      lines.splice(
        lines.length - 1, 0,
        `a=rtpmap:${pt} multiopus/48000/${c.ch}`,
        `a=fmtp:${pt} channel_mapping=${c.mapping};num_streams=${c.streams};coupled_streams=${c.coupled}`,
        `a=rtcp-fb:${pt} transport-cc`
      )
    }
    return lines.join('\r\n')
  }

  function enableL16(payloadTypes: string[], section: string): string {
    const lines = section.split('\r\n')
    for (const rate of ['8000', '16000', '48000']) {
      const pt = reservePayloadType(payloadTypes)
      lines[0] += ` ${pt}`
      lines.splice(lines.length - 1, 0, `a=rtpmap:${pt} L16/${rate}/2`, `a=rtcp-fb:${pt} transport-cc`)
    }
    return lines.join('\r\n')
  }

  function editOffer(sdp: string): string {
    const sections = sdp.split('m=')
    const payloadTypes = sections.slice(1)
      .map((s) => s.split('\r\n')[0].split(' ').slice(3))
      .reduce((prev, cur) => [...prev, ...cur], [])
    for (let i = 1; i < sections.length; i++) {
      if (sections[i].startsWith('audio')) {
        sections[i] = enableStereoOpus(sections[i])
        if (nonAdvertisedCodecs.includes('pcma/8000/2'))
          sections[i] = enableStereoPcmau(payloadTypes, sections[i])
        if (nonAdvertisedCodecs.includes('multiopus/48000/6'))
          sections[i] = enableMultichannelOpus(payloadTypes, sections[i])
        if (nonAdvertisedCodecs.includes('L16/48000/2'))
          sections[i] = enableL16(payloadTypes, sections[i])
        break
      }
    }
    return sections.join('m=')
  }

  function parseOffer(sdp: string) {
    const ret = { iceUfrag: '', icePwd: '', medias: [] as string[] }
    for (const line of sdp.split('\r\n')) {
      if (line.startsWith('m=')) ret.medias.push(line.slice(2))
      else if (!ret.iceUfrag && line.startsWith('a=ice-ufrag:')) ret.iceUfrag = line.slice(12)
      else if (!ret.icePwd && line.startsWith('a=ice-pwd:')) ret.icePwd = line.slice(10)
    }
    return ret
  }

  function generateSdpFragment(od: typeof offerData, candidates: RTCIceCandidate[]) {
    if (!od) return ''
    const byMedia: Record<number, RTCIceCandidate[]> = {}
    for (const c of candidates) {
      const mid = c.sdpMLineIndex ?? 0
      if (!byMedia[mid]) byMedia[mid] = []
      byMedia[mid].push(c)
    }
    let frag = `a=ice-ufrag:${od.iceUfrag}\r\na=ice-pwd:${od.icePwd}\r\n`
    let mid = 0
    for (const media of od.medias) {
      if (byMedia[mid]) {
        frag += `m=${media}\r\na=mid:${mid}\r\n`
        for (const c of byMedia[mid]) frag += `a=${c.candidate}\r\n`
      }
      mid++
    }
    return frag
  }

  function linkToIceServers(links: string | null): RTCIceServer[] {
    if (!links) return []
    return links.split(', ').map((link) => {
      const m = link.match(
        /^<(.+?)>; rel="ice-server"(; username="(.*?)"; credential="(.*?)"; credential-type="password")?/i
      )
      if (!m) return { urls: [] }
      const ret: RTCIceServer = { urls: [m[1]] }
      if (m[3] !== undefined) {
        ret.username = JSON.parse(`"${m[3]}"`)
        ret.credential = JSON.parse(`"${m[4]}"`)
      }
      return ret
    })
  }

  // --- Core WHEP flow ---

  function handleError(err: string) {
    if (closed) return

    if (pc) { pc.close(); pc = null }
    offerData = null
    if (sessionUrl) {
      fetch(sessionUrl, { method: 'DELETE' }).catch(() => {})
      sessionUrl = null
    }
    queuedCandidates = []

    error.value = err
    setState('reconnecting')
    options.onError?.(`${err}，正在重连...`)

    restartTimeout = setTimeout(() => {
      restartTimeout = null
      if (!closed) start()
    }, RETRY_PAUSE)
  }

  async function requestIceServers(): Promise<RTCIceServer[]> {
    const res = await fetch(currentUrl, { method: 'OPTIONS' })
    return linkToIceServers(res.headers.get('Link'))
  }

  async function setupPeerConnection(iceServers: RTCIceServer[]): Promise<string> {
    if (closed) throw new Error('closed')

    pc = new RTCPeerConnection({ iceServers })
    pc.addTransceiver('video', { direction: 'recvonly' })
    pc.addTransceiver('audio', { direction: 'recvonly' })
    pc.createDataChannel('')

    pc.onicecandidate = (evt) => {
      if (closed || !evt.candidate) return
      if (!sessionUrl) {
        queuedCandidates.push(evt.candidate)
      } else {
        sendLocalCandidates([evt.candidate])
      }
    }

    pc.onconnectionstatechange = () => {
      if (closed) return
      if (pc?.connectionState === 'failed' || pc?.connectionState === 'closed') {
        handleError('peer connection closed')
      }
    }

    pc.ontrack = (evt) => {
      if (videoRef.value && evt.streams[0]) {
        videoRef.value.srcObject = evt.streams[0]
        videoRef.value.play().catch(() => {})
        error.value = ''
        setState('connected')
      }
    }

    const offer = await pc.createOffer()
    offer.sdp = editOffer(offer.sdp!)
    offerData = parseOffer(offer.sdp!)
    await pc.setLocalDescription(offer)
    return offer.sdp!
  }

  async function sendOffer(offerSdp: string): Promise<string> {
    if (closed) throw new Error('closed')

    const res = await fetch(currentUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/sdp' },
      body: offerSdp,
    })

    if (res.status === 404) throw new Error('stream not found')
    if (res.status === 400) {
      const e = await res.json()
      throw new Error(e.error)
    }
    if (res.status !== 201) throw new Error(`bad status code ${res.status}`)

    sessionUrl = new URL(res.headers.get('location')!, currentUrl).toString()
    return res.text()
  }

  async function setAnswer(answer: string) {
    if (closed || !pc) throw new Error('closed')

    await pc.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: answer }))

    if (!closed && queuedCandidates.length) {
      sendLocalCandidates(queuedCandidates)
      queuedCandidates = []
    }
  }

  function sendLocalCandidates(candidates: RTCIceCandidate[]) {
    if (!sessionUrl) return
    fetch(sessionUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/trickle-ice-sdpfrag', 'If-Match': '*' },
      body: generateSdpFragment(offerData, candidates),
    })
      .then((res) => {
        if (res.status !== 204) {
          throw new Error(`PATCH failed: ${res.status}`)
        }
      })
      .catch((err) => handleError(err.toString()))
  }

  async function start() {
    if (closed) return
    setState('connecting')
    try {
      const iceServers = await requestIceServers()
      const offerSdp = await setupPeerConnection(iceServers)
      const answer = await sendOffer(offerSdp)
      await setAnswer(answer)
    } catch (err: unknown) {
      handleError(err instanceof Error ? err.message : String(err))
    }
  }

  async function getNonAdvertisedCodecs() {
    const tests: [string, string?][] = [
      ['pcma/8000/2'],
      ['multiopus/48000/6', 'channel_mapping=0,4,1,2,3,5;num_streams=4;coupled_streams=2'],
      ['L16/48000/2'],
    ]
    const results = await Promise.all(
      tests.map(([codec, fmtp]) =>
        supportsNonAdvertisedCodec(codec, fmtp).then((r) => (r ? codec : null))
      )
    )
    nonAdvertisedCodecs = results.filter((c): c is string => c !== null)
  }

  // --- Public API ---

  async function connect(url: string) {
    disconnect()
    closed = false
    currentUrl = url
    error.value = ''
    setState('connecting')
    try {
      await getNonAdvertisedCodecs()
      if (!closed) await start()
    } catch (err: unknown) {
      handleError(err instanceof Error ? err.message : String(err))
    }
  }

  function disconnect() {
    closed = true
    if (restartTimeout) { clearTimeout(restartTimeout); restartTimeout = null }
    if (pc) { pc.close(); pc = null }
    if (sessionUrl) {
      fetch(sessionUrl, { method: 'DELETE' }).catch(() => {})
      sessionUrl = null
    }
    offerData = null
    queuedCandidates = []
    if (videoRef.value) videoRef.value.srcObject = null
    error.value = ''
    setState('idle')
  }

  const isConnected = ref(false)

  onUnmounted(disconnect)

  return {
    state,
    error,
    connect,
    disconnect,
    isConnected,
  }
}
