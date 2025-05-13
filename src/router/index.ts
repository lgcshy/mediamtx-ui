import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Paths from '@/views/Paths.vue'
import Sources from '@/views/Sources.vue'
import Config from '@/views/Config.vue'
import RtmpConnections from '@/views/RtmpConnections.vue'
import RtspConnections from '@/views/RtspConnections.vue'
import WebRTCSessions from '@/views/WebRTCSessions.vue'
import Recordings from '@/views/Recordings.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '系统状态',
        icon: 'Monitor'
      }
    },
    {
      path: '/paths',
      name: 'paths',
      component: Paths,
      meta: {
        title: '路径管理',
        icon: 'Connection'
      }
    },
    {
      path: '/sources',
      name: 'sources',
      component: Sources,
      meta: {
        title: '源管理',
        icon: 'VideoPlay'
      }
    },
    {
      path: '/config',
      name: 'config',
      component: Config,
      meta: {
        title: '配置管理',
        icon: 'Setting'
      }
    },
    {
      path: '/rtmp-connections',
      name: 'rtmp-connections',
      component: RtmpConnections,
      meta: {
        title: 'RTMP 连接',
        icon: 'Link'
      }
    },
    {
      path: '/rtsp-connections',
      name: 'rtsp-connections',
      component: RtspConnections,
      meta: {
        title: 'RTSP 连接',
        icon: 'Link'
      }
    },
    {
      path: '/webrtc-sessions',
      name: 'webrtc-sessions',
      component: WebRTCSessions,
      meta: {
        title: 'WebRTC 会话',
        icon: 'VideoCamera'
      }
    },
    {
      path: '/recordings',
      name: 'recordings',
      component: Recordings,
      meta: {
        title: '录制文件',
        icon: 'Folder'
      }
    }
  ]
})

// 路由守卫：设置页面标题
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - MediaMTX 管理界面`
  next()
})

export default router 