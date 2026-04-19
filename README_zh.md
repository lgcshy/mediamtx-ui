# MediaMTX 管理界面

中文 | [English](README.md)

基于 Vue 3 + TypeScript 开发的 [MediaMTX](https://github.com/bluenviron/mediamtx) 流媒体服务器管理后台。

## 功能特性

- **仪表盘** — 实时概览，包含服务器信息、路径统计、源类型分布（饼图）和各协议连接数（柱状图），图表由 ECharts 驱动
- **流管理** — 实时路径状态监控 + 路径配置增删改查
- **连接管理** — 查看和管理所有协议的连接/会话：
  - RTSP 连接（只读）& 会话（可踢出）
  - RTMP 连接（可踢出）
  - WebRTC 会话（可踢出）
  - HLS Muxers（只读）
  - SRT 连接（可踢出）
- **录制管理** — 浏览录制列表，删除录制段
- **系统配置** — 编辑所有 MediaMTX 服务器设置（基本、认证、RTSP、RTMP、HLS、WebRTC、SRT、API、录制）
- **主题切换** — 浅色 / 深色主题，侧边栏颜色自适应
- **自动刷新** — 连接视图支持可配置的自动刷新

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Vue 3（Composition API、`<script setup>`） |
| 语言 | TypeScript（严格模式） |
| 构建工具 | Vite |
| UI 组件库 | Element Plus |
| 状态管理 | Pinia |
| 图表 | ECharts + vue-echarts |
| HTTP 客户端 | Axios |
| 路由 | Vue Router 4 |

## 环境要求

- Node.js >= 16
- npm >= 7
- [MediaMTX](https://github.com/bluenviron/mediamtx) 服务器（需启用 API）

## 快速开始

### 1. 启动 MediaMTX（开启 API）

方式 A — 使用项目自带的开发配置（需要 Go 环境）：

```bash
npm run dev:api
```

方式 B — 手动启动 MediaMTX，在配置文件中设置 `api: true`：

```yaml
api: true
apiAddress: :9997
```

### 2. 启动前端开发服务器

```bash
npm install
npm run dev
```

### 3. 打开浏览器

```
http://localhost:3000
```

开发服务器会将 `/api/*` 请求代理到 `http://localhost:9997`（MediaMTX API）。

## 构建

```bash
npm run build
```

构建产物输出到 `dist/` 目录。使用任意静态文件服务器托管，并将 `/api/*` 代理到 MediaMTX 实例即可。

## 项目结构

```
src/
├── api/            # Axios API 模块（每个资源一个文件）
├── composables/    # 共享组合式函数（格式化、自动刷新）
├── router/         # Vue Router 配置（懒加载）
├── stores/         # Pinia 状态管理（每个资源一个 store）
├── types/          # TypeScript 类型定义（匹配 MediaMTX API）
├── views/          # 页面组件
├── App.vue         # 布局（侧边栏 + 顶栏 + 主内容区）
├── main.ts         # 应用入口（Element Plus、ECharts、Router、Pinia）
└── style.css       # 全局样式（CSS 自定义属性实现主题）
```

## API 兼容性

所有 API 调用对接 **MediaMTX v3 REST API**（`/v3/...`）。`src/types/api.ts` 中的类型定义源自 MediaMTX Go 源码（`internal/defs/api*.go`）。

## 许可证

MIT
