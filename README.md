# MediaMTX Admin UI

[中文](README_zh.md) | English

A modern web admin dashboard for [MediaMTX](https://github.com/bluenviron/mediamtx) streaming media server, built with Vue 3 and TypeScript.

## Features

- **Dashboard** — Real-time overview with server info, path statistics, source type distribution (pie chart), and protocol connection counts (bar chart) powered by ECharts
- **Path Management** — Live path status monitoring and path configuration CRUD
- **Connection Management** — View and manage connections/sessions across all protocols:
  - RTSP Connections (read-only) & Sessions (kickable)
  - RTMP Connections (kickable)
  - WebRTC Sessions (kickable)
  - HLS Muxers (read-only)
  - SRT Connections (kickable)
- **Recording Management** — Browse recordings and delete segments
- **Global Configuration** — Edit all MediaMTX server settings (General, Auth, RTSP, RTMP, HLS, WebRTC, SRT, API, Recording)
- **Theme Switching** — Light / Dark theme with adaptive sidebar colors
- **Auto Refresh** — Configurable auto-refresh for connection views

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Language | TypeScript (strict mode) |
| Build Tool | Vite |
| UI Library | Element Plus |
| State Management | Pinia |
| Charts | ECharts + vue-echarts |
| HTTP Client | Axios |
| Router | Vue Router 4 |

## Prerequisites

- Node.js >= 16
- npm >= 7
- [MediaMTX](https://github.com/bluenviron/mediamtx) server with API enabled

## Quick Start

### 1. Start MediaMTX with API enabled

Option A — Use the included dev config (requires Go):

```bash
npm run dev:api
```

Option B — Start MediaMTX manually with `api: true` in your config:

```yaml
api: true
apiAddress: :9997
```

### 2. Start the UI dev server

```bash
npm install
npm run dev
```

### 3. Open in browser

```
http://localhost:3000
```

The dev server proxies `/api/*` requests to `http://localhost:9997` (MediaMTX API).

## Build

```bash
npm run build
```

Output goes to `dist/`. Serve with any static file server and proxy `/api/*` to your MediaMTX instance.

## Project Structure

```
src/
├── api/            # Axios API modules (one per resource)
├── composables/    # Shared composables (formatters, auto-refresh)
├── router/         # Vue Router config with lazy loading
├── stores/         # Pinia stores (one per resource)
├── types/          # TypeScript types matching MediaMTX API
├── views/          # Page components
├── App.vue         # Layout (sidebar + header + main)
├── main.ts         # App entry (Element Plus, ECharts, Router, Pinia)
└── style.css       # Global styles with CSS custom properties
```

## API Compatibility

All API calls target **MediaMTX v3 REST API** (`/v3/...`). The type definitions in `src/types/api.ts` are derived from the MediaMTX Go source code (`internal/defs/api*.go`).

## License

MIT
