# ChatGPT-4 Morse Code Decoder - 云端部署

## 快速部署步骤

### 1. 设置POE API Key
```bash
cd backend
./setup-poe-key.sh
```

### 2. 部署到Cloudflare Workers
```bash
npm run deploy
```

### 3. 测试部署结果
```bash
curl -X POST https://morse-coder-worker.yhc2073.workers.dev/api/chatgpt-decode \
  -H "Content-Type: application/json" \
  -d '{
    "image": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
    "imageType": "image/png"
  }'
```

## 功能说明

- **新增端点**: `/api/chatgpt-decode`
- **功能**: 使用ChatGPT-4o-Latest识别图片中的Morse码
- **API配置**: 前端在开发和生产环境都使用线上Worker地址
- **前端集成**: "Try ChatGPT-4 Decode" 按钮在以下位置可用：
  - 图片上传后的选项按钮区域
  - OCR失败后弹出的Manual Input输入框中

## 网络配置说明

- **ChatGPT-4 API**: 始终使用 `https://morse-coder-worker.yhc2073.workers.dev`
- **R2调试上传**: 开发环境使用localhost，生产环境使用Worker地址
- **原因**: ChatGPT功能需要真实的POE API密钥，只在云端Worker中配置

## 用户体验流程

1. **上传图片** → 显示ChatGPT-4选项
2. **OCR处理失败** → 自动显示Manual Input框，内含ChatGPT-4按钮
3. **ChatGPT-4成功** → 自动关闭Manual Input框，显示识别结果
4. **ChatGPT-4失败** → 在Manual Input框中显示错误信息

## 环境变量

Worker需要以下环境变量（通过secret设置）：
- `POE_API_KEY`: twIl5oH_lehmQO9mAWoOl5iTyxczFNq8tU6yzfiJ3K0

## 查看日志

```bash
npm run tail
```