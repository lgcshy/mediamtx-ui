import { ref, onUnmounted } from 'vue'

export function useAutoRefresh(callback: () => Promise<void>, intervalMs = 5000) {
  const active = ref(false)
  let timer: ReturnType<typeof setInterval> | null = null

  const start = () => {
    if (timer) return
    active.value = true
    timer = setInterval(async () => {
      try {
        await callback()
      } catch {
        // 静默处理自动刷新错误
      }
    }, intervalMs)
  }

  const stop = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    active.value = false
  }

  const toggle = () => {
    active.value ? stop() : start()
  }

  onUnmounted(stop)

  return { active, start, stop, toggle }
}
