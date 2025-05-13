export interface Recording {
  name: string
  path: string
  created: string
  size: number
  duration: number
}

export interface RecordingList {
  pageCount: number
  itemCount: number
  items: Recording[]
} 