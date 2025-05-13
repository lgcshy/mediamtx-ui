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