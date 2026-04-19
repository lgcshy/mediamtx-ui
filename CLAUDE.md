# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Admin UI for [MediaMTX](https://github.com/bluenviron/mediamtx) streaming media server. Built with Vue 3 (Composition API + `<script setup>`), TypeScript, Vite, Element Plus, Pinia, and ECharts. The UI is in Chinese.

## Commands

- `npm run dev` — Start dev server on port 3000 (proxies `/api/*` to `http://localhost:9997`)
- `npm run dev:api` — Build and start MediaMTX with API enabled (requires Go)
- `npm run build` — Type-check with vue-tsc then build with Vite
- `npm run preview` — Preview production build
- No test framework configured

## Architecture

**Data flow**: Vue views → Pinia stores → API modules (axios) → MediaMTX v3 REST API (`/v3/...`)

- `src/types/api.ts` — All TypeScript types matching MediaMTX Go structs (`internal/defs/api*.go`). Single source of truth.
- `src/api/` — Axios-based API modules. Central instance in `index.ts` (baseURL `/api`, response interceptor unwraps `.data`). One file per API resource.
- `src/stores/` — Pinia stores (Composition API). Each store owns reactive state + async actions. Stores receive unwrapped responses (no `.data` access needed).
- `src/views/` — Page components: Home (dashboard with ECharts), Paths, PathsConfig, connection views (RTSP Conn/Session, RTMP, WebRTC, HLS Muxers, SRT), Recordings, Config.
- `src/composables/` — Shared composables: `useFormatters.ts` (formatBytes, formatDate, formatUptime, formatState, formatSourceType), `useAutoRefresh.ts` (interval polling).
- `src/router/index.ts` — Routes with lazy loading. Route guard sets document title.
- `src/style.css` — Global styles with CSS custom properties for light/dark theming. Sidebar colors adapt to theme (white in light, dark in dark).

## Key API Mapping

MediaMTX API has distinct concepts:
- **Paths** (`/v3/paths/`) — Live path state (online, source, readers, traffic). Read-only.
- **Path Config** (`/v3/config/paths/`) — Path configuration CRUD.
- **RTSP Connections** (`/v3/rtspconns/`) — Read-only, no kick.
- **RTSP Sessions** (`/v3/rtspsessions/`) — Support kick.
- **RTMP Connections** (`/v3/rtmpconns/`) — Support kick.
- **HLS Muxers** (`/v3/hlsmuxers/`) — Read-only, no kick.
- **SRT Connections** (`/v3/srtconns/`) — Support kick.
- **Info** (`/v3/info`) — Server version and start time.

## Code Style

- **Formatting**: Prettier — no semicolons, single quotes, 100 char width, no trailing commas
- **Linting**: ESLint with vue3-recommended + TypeScript
- **Path alias**: `@/` maps to `src/`
- **TypeScript**: Strict mode, no unused locals/parameters

## Development Setup

1. Start MediaMTX with API: `npm run dev:api` (or manually: `cd ../mediamtx && go build . && ./mediamtx ../mediamtx-ui/mediamtx-dev.yml`)
2. Start UI: `npm run dev`
3. Open http://localhost:3000
