# MediaMTX 管理界面项目文档

## 1. 项目概述

**项目名称**: admin-mediamtx  
**项目描述**: MediaMTX的Web管理界面  
**技术栈**:
- Vue 3
- TypeScript
- Vite
- Pinia (状态管理)
- Vue Router
- Element Plus (UI组件库)
- Axios (HTTP请求)

## 2. 项目目录结构

```
admin-mediamtx/
├── public/              # 静态资源目录
├── src/                 # 源代码目录
│   ├── api/             # API接口调用
│   ├── assets/          # 项目资源文件
│   ├── components/      # 公共组件
│   ├── router/          # 路由配置
│   ├── stores/          # Pinia状态管理
│   ├── types/           # TypeScript类型定义
│   ├── views/           # 页面视图组件
│   ├── App.vue          # 根组件
│   ├── main.ts          # 入口文件
│   ├── style.css        # 全局样式
│   ├── env.d.ts         # 环境变量类型声明
│   └── vite-env.d.ts    # Vite环境类型声明
├── index.html           # HTML入口文件
├── package.json         # 项目依赖配置
├── tsconfig.json        # TypeScript配置
├── vite.config.ts       # Vite配置
└── README.md            # 项目说明
```

## 3. 项目搭建步骤

### 3.1 初始化项目

```bash
# 使用Vite创建Vue 3 + TypeScript项目
npm create vite@latest admin-mediamtx -- --template vue-ts

# 进入项目目录
cd admin-mediamtx

# 安装依赖
npm install
```

### 3.2 添加核心依赖

```bash
# 安装生产依赖
npm install vue-router pinia axios element-plus @element-plus/icons-vue @vueuse/core

# 安装开发依赖
npm install -D typescript @types/node eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-vue
```

### 3.3 配置项目

#### Vite配置 (vite.config.ts)

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:9997',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

#### TypeScript配置 (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## 4. 核心模块详解

### 4.1 入口文件 (main.ts)

入口文件负责创建Vue应用实例并挂载到DOM上，同时配置各种插件和全局设置。

```typescript
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
```

### 4.2 路由配置 (router/index.ts)

Vue Router负责管理应用的路由，定义页面跳转逻辑和路由守卫。

```typescript
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Paths from '@/views/Paths.vue'
// 其他导入...

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
    // 其他路由...
  ]
})

// 路由守卫：设置页面标题
router.beforeEach((to, _from, next) => {
  document.title = `${to.meta.title} - MediaMTX 管理界面`
  next()
})

export default router
```

### 4.3 状态管理 (stores/)

Pinia用于管理应用状态，替代了Vue 2中的Vuex。以主题管理为例：

```typescript
// stores/theme.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

type ThemeType = 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
  // 初始主题从本地存储获取，如果没有则使用系统偏好
  const getDefaultTheme = (): ThemeType => {
    const savedTheme = localStorage.getItem('theme') as ThemeType
    if (savedTheme) return savedTheme
    
    // 检查系统偏好
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  
  const currentTheme = ref<ThemeType>(getDefaultTheme())
  
  // 切换主题
  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  }
  
  // 设置特定主题
  const setTheme = (theme: ThemeType) => {
    currentTheme.value = theme
  }
  
  // 监听主题变化，更新 DOM 和本地存储
  watch(currentTheme, (newTheme) => {
    // 更新 HTML 元素的 class
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(newTheme)
    
    // 更新 Element Plus 主题
    document.documentElement.setAttribute('data-theme', newTheme)
    
    // 保存到本地存储
    localStorage.setItem('theme', newTheme)
  }, { immediate: true })
  
  return {
    currentTheme,
    toggleTheme,
    setTheme
  }
})
```

### 4.4 API调用 (api/)

API层使用Axios进行HTTP请求，并按功能模块组织API调用。

```typescript
// api/index.ts
import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // TODO: 添加认证信息
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // TODO: 统一错误处理
    return Promise.reject(error)
  }
)

export default api

// 系统相关 API
export * from './system'

// 配置相关 API
export * from './config'
export * from './globalConfig'
export * from './pathsConfig'
export * from './sourcesConfig'

// 认证相关 API
export * from './auth'

// 连接相关 API
export * from './rtspConn'
export * from './rtmpConn'
export * from './webrtc'

// 录制相关 API
export * from './recordings'

// HLS 相关 API
export * from './hlsMuxer'
```

## 5. Vue 3 与 TypeScript 结合使用

### 5.1 组件示例

Vue 3组件使用`<script setup>`语法糖与TypeScript结合：

```vue
<template>
  <div class="component">
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <el-button @click="increment">点击次数: {{ count }}</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

// 定义props
interface Props {
  title: string
  initialCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  initialCount: 0
})

// 定义状态
const count = ref(props.initialCount)
const message = computed(() => `当前计数: ${count.value}`)

// 定义方法
const increment = () => {
  count.value++
}

// 定义事件
const emit = defineEmits<{
  (e: 'update', value: number): void
}>()

// 监听count变化并触发事件
watch(count, (newValue) => {
  emit('update', newValue)
})
</script>

<style scoped>
.component {
  padding: 1rem;
}
</style>
```

### 5.2 TypeScript类型定义

在`src/types/`目录中定义接口和类型：

```typescript
// types/api.ts
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

export interface Pagination {
  page: number
  pageSize: number
  total: number
}

export interface PaginatedResponse<T> extends ApiResponse {
  data: {
    list: T[]
    pagination: Pagination
  }
}
```

## 6. 开发与构建

### 6.1 开发命令

```bash
# 启动开发服务器
npm run dev
```

### 6.2 构建命令

```bash
# 类型检查和构建生产版本
npm run build

# 预览构建后的应用
npm run preview
```

## 7. 最佳实践

### 7.1 组件设计原则

- 单一职责原则：每个组件只负责一个功能
- 组合优于继承：使用组合式API组合功能
- 类型安全：使用TypeScript定义props、事件和状态类型

### 7.2 状态管理原则

- 按功能模块拆分store
- 使用组合式API定义store
- 只在store中处理全局状态，组件内状态使用ref/reactive

### 7.3 API调用原则

- 统一处理请求和响应
- 按功能模块组织API
- 使用TypeScript定义请求和响应类型

## 8. 总结

本项目是一个基于Vue 3、TypeScript和Vite的现代前端应用，采用了组件化、模块化的设计思想，使用Pinia进行状态管理，Vue Router进行路由管理，Element Plus作为UI组件库。通过合理的目录结构和代码组织，实现了一个可维护、可扩展的MediaMTX管理界面。 