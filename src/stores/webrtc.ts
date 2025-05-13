import { defineStore } from 'pinia'
import * as api from '@/api/webrtc'

interface WebRTCSession {
  id: string
  created: string
  remoteAddr: string
  state: string
  path: string
  query: string
  bytesReceived: number
  bytesSent: number
}

interface WebRTCSessionList {
  pageCount: number
  itemCount: number
  items: WebRTCSession[]
}

export const useWebRTCStore = defineStore('webrtc', {
  state: () => ({
    list: [] as WebRTCSession[],
    pageCount: 0,
    itemCount: 0,
    current: null as WebRTCSession | null
  }),
  actions: {
    async fetchList(page = 0, itemsPerPage = 100) {
      try {
        const res = await api.getWebRTCSessions(page, itemsPerPage)
        console.log('WebRTC sessions response:', res)
        
        // Handle the case where data might be directly in the response
        const data = res.data || res
        
        // Initialize with empty arrays/values if properties are missing
        this.list = data.items || []
        this.pageCount = data.pageCount || 0
        this.itemCount = data.itemCount || 0
      } catch (error) {
        console.error('Error fetching WebRTC sessions:', error)
        // Reset to empty state on error
        this.list = []
        this.pageCount = 0
        this.itemCount = 0
        throw error
      }
    },
    async fetchOne(id: string) {
      try {
        const res = await api.getWebRTCSession(id)
        console.log('WebRTC session detail response:', res)
        
        // Handle the case where data might be directly in the response
        this.current = res.data || res
        return this.current
      } catch (error) {
        console.error('Error fetching WebRTC session details:', error)
        this.current = null
        throw error
      }
    },
    async getSession(id: string) {
      await this.fetchOne(id)
      return this.current
    },
    async kickSession(id: string) {
      try {
        await api.closeWebRTCSession(id)
        // Remove the session from the list if it exists
        this.list = this.list.filter(session => session.id !== id)
        return true
      } catch (error) {
        console.error('Error kicking WebRTC session:', error)
        throw error
      }
    }
  }
}) 