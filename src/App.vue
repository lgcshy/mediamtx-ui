<script setup lang="ts">
import { ref } from 'vue'
import { Monitor, VideoPlay, Connection, Link, VideoCamera, Folder, Setting, Expand, Fold, Moon, Sunny } from '@element-plus/icons-vue'
import { useThemeStore } from './stores/theme'

const isCollapse = ref(false)
const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}

const themeStore = useThemeStore()
</script>

<template>
  <el-container class="app-wrapper">
    <el-aside :width="isCollapse ? '64px' : '220px'" class="sidebar-container">
      <div class="logo-container">
        <div class="logo">
          <el-icon class="logo-icon"><VideoCamera /></el-icon>
          <span v-if="!isCollapse">MediaMTX</span>
        </div>
        <el-icon class="toggle-icon" @click="toggleSidebar">
          <Fold v-if="!isCollapse" />
          <Expand v-else />
        </el-icon>
      </div>
      
      <el-menu
        :router="true"
        :default-active="$route.path"
        class="el-menu-vertical"
        :collapse="isCollapse"
      >
        <el-menu-item index="/">
          <el-icon><Monitor /></el-icon>
          <template #title>系统状态</template>
        </el-menu-item>

        <el-sub-menu index="streams">
          <template #title>
            <el-icon><VideoPlay /></el-icon>
            <span>流管理</span>
          </template>
          <el-menu-item index="/paths">
            <el-icon><Connection /></el-icon>
            <span>路径管理</span>
          </el-menu-item>
          <el-menu-item index="/sources">
            <el-icon><VideoPlay /></el-icon>
            <span>源管理</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="connections">
          <template #title>
            <el-icon><Link /></el-icon>
            <span>连接管理</span>
          </template>
          <el-menu-item index="/rtmp-connections">
            <el-icon><Link /></el-icon>
            <span>RTMP 连接</span>
          </el-menu-item>
          <el-menu-item index="/rtsp-connections">
            <el-icon><Link /></el-icon>
            <span>RTSP 连接</span>
          </el-menu-item>
          <el-menu-item index="/webrtc-sessions">
            <el-icon><VideoCamera /></el-icon>
            <span>WebRTC 会话</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/recordings">
          <el-icon><Folder /></el-icon>
          <template #title>录制文件</template>
        </el-menu-item>

        <el-menu-item index="/config">
          <el-icon><Setting /></el-icon>
          <template #title>配置管理</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container class="main-container">
      <el-header class="app-header">
        <div class="header-content">
          <div class="header-title">
            <h2>{{ $route.meta.title || '系统控制台' }}</h2>
          </div>
          <div class="header-actions">
            <el-tooltip
              :content="themeStore.currentTheme === 'dark' ? '切换到浅色模式' : '切换到深色模式'"
              placement="bottom"
            >
              <el-button
                circle
                @click="themeStore.toggleTheme()"
                :icon="themeStore.currentTheme === 'dark' ? Sunny : Moon"
              />
            </el-tooltip>
          </div>
        </div>
      </el-header>

      <el-main class="app-main">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
      
      <el-footer class="app-footer">
        <div class="footer-content">
          <span>MediaMTX Admin © {{ new Date().getFullYear() }}</span>
        </div>
      </el-footer>
    </el-container>
  </el-container>
</template>

<style scoped>
.app-wrapper {
  height: 100vh;
  background-color: var(--el-bg-color);
}

.sidebar-container {
  background-color: var(--el-menu-bg-color);
  color: var(--el-text-color-primary);
  transition: width 0.3s;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 1000;
}

.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: var(--el-menu-bg-color);
  overflow: hidden;
}

.logo {
  display: flex;
  align-items: center;
  height: 100%;
}

.logo-icon {
  font-size: 24px;
  color: var(--el-color-primary);
}

.logo span {
  font-size: 18px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin-left: 12px;
  white-space: nowrap;
}

.toggle-icon {
  font-size: 16px;
  color: var(--el-text-color-primary);
  cursor: pointer;
  transition: transform 0.3s;
}

.toggle-icon:hover {
  color: var(--el-color-primary);
}

.el-menu-vertical {
  border-right: none;
  background-color: var(--el-menu-bg-color);
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 220px;
}

.main-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.app-header {
  background-color: var(--el-bg-color);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  padding: 0;
  height: 60px;
  line-height: 60px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}

.header-title h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: var(--el-text-color-primary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.app-main {
  padding: 20px;
  overflow-y: auto;
  background-color: var(--el-bg-color-page);
  flex: 1;
}

.app-footer {
  height: 40px;
  background-color: var(--el-bg-color);
  color: var(--el-text-color-secondary);
  font-size: 14px;
  border-top: 1px solid var(--el-border-color-light);
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-content {
  text-align: center;
}

/* 暗黑模式适配 */
@media (prefers-color-scheme: dark) {
  .sidebar-container {
    background-color: #1f2937;
  }
  
  .logo-container {
    background-color: #111827;
  }
  
  .el-menu-vertical {
    background-color: #1f2937;
  }
  
  .app-header {
    background-color: #1f2937;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }
  
  .header-title h2 {
    color: #e5e7eb;
  }
  
  .app-main {
    background-color: #111827;
  }
  
  .app-footer {
    background-color: #1f2937;
    color: #9ca3af;
    border-top: 1px solid #374151;
  }
}
</style>
