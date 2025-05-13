import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

import './style.css'

// 初始化主题
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'light'
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  // 如果没有保存的主题，则使用系统偏好
  const theme = savedTheme || (prefersDark ? 'dark' : 'light')
  
  // 设置文档根元素的类名
  document.documentElement.classList.add(theme)
  document.documentElement.setAttribute('data-theme', theme)
}

// 应用启动前初始化主题
initTheme()

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
