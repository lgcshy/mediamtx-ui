# MediaMTX 管理界面

这是一个基于 Vue 3 + TypeScript 开发的 MediaMTX 流媒体服务器管理界面。

## 功能特性

- 系统状态监控
- 路径管理
- 源管理
- 配置管理
- 支持 RTSP、RTMP、HLS 等协议

## 技术栈

- Vue 3
- TypeScript
- Vite
- Element Plus
- Pinia
- Vue Router
- Axios

## 开发环境要求

- Node.js >= 16
- npm >= 7

## 安装

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 使用说明

1. 确保 MediaMTX 服务器已经启动
2. 启动管理界面
3. 访问 http://localhost:3000

## 配置说明

在 `vite.config.ts` 中配置 API 代理：

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:9997',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
```

## 开发计划

- [ ] 实现所有 MediaMTX API 接口
- [ ] 添加用户认证
- [ ] 优化 UI/UX
- [ ] 添加更多功能

## 贡献指南

1. Fork 本仓库
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT
