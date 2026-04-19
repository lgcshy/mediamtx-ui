import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: { title: '仪表盘' }
    },
    {
      path: '/paths',
      name: 'paths',
      component: () => import('@/views/Paths.vue'),
      meta: { title: '路径状态' }
    },
    {
      path: '/paths/config',
      name: 'pathsConfig',
      component: () => import('@/views/PathsConfig.vue'),
      meta: { title: '路径配置' }
    },
    {
      path: '/rtsp/connections',
      name: 'rtspConnections',
      component: () => import('@/views/RtspConnections.vue'),
      meta: { title: 'RTSP 连接' }
    },
    {
      path: '/rtsp/sessions',
      name: 'rtspSessions',
      component: () => import('@/views/RtspSessions.vue'),
      meta: { title: 'RTSP 会话' }
    },
    {
      path: '/rtmp/connections',
      name: 'rtmpConnections',
      component: () => import('@/views/RtmpConnections.vue'),
      meta: { title: 'RTMP 连接' }
    },
    {
      path: '/webrtc/sessions',
      name: 'webrtcSessions',
      component: () => import('@/views/WebRTCSessions.vue'),
      meta: { title: 'WebRTC 会话' }
    },
    {
      path: '/hls/muxers',
      name: 'hlsMuxers',
      component: () => import('@/views/HlsMuxers.vue'),
      meta: { title: 'HLS Muxers' }
    },
    {
      path: '/srt/connections',
      name: 'srtConnections',
      component: () => import('@/views/SrtConnections.vue'),
      meta: { title: 'SRT 连接' }
    },
    {
      path: '/recordings',
      name: 'recordings',
      component: () => import('@/views/Recordings.vue'),
      meta: { title: '录制管理' }
    },
    {
      path: '/config',
      name: 'config',
      component: () => import('@/views/Config.vue'),
      meta: { title: '系统配置' }
    }
  ]
})

router.beforeEach((to) => {
  document.title = `${to.meta.title || 'MediaMTX'} - MediaMTX Admin`
})

export default router
