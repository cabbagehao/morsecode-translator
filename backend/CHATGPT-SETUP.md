# ChatGPT-4 Morse Code Decoder Setup

这个文档说明如何为Morse Code Translator设置ChatGPT-4图像解码功能。

## 功能概述

ChatGPT-4解码功能允许用户：
- 上传包含Morse代码的图片
- 通过ChatGPT-4o-Latest模型自动识别和提取Morse代码
- 获得比传统OCR更准确的识别结果

## 技术架构

- **前端**: React + TypeScript (Vite)
- **后端**: Cloudflare Worker
- **AI服务**: Poe API (OpenAI兼容接口)
- **模型**: ChatGPT-4o-Latest (支持视觉识别)

## 部署步骤

### 1. 设置POE API Key

使用提供的脚本设置API密钥：

```bash
cd backend
chmod +x setup-poe-key.sh
./setup-poe-key.sh
```

或者手动设置：

```bash
cd backend
echo "twIl5oH_lehmQO9mAWoOl5iTyxczFNq8tU6yzfiJ3K0" | wrangler secret put POE_API_KEY
```

### 2. 部署Cloudflare Worker

```bash
cd backend
npm run deploy
```

### 3. 验证部署

检查Worker是否正常运行：

```bash
curl -X POST https://morse-coder-worker.yhc2073.workers.dev/api/chatgpt-decode \
  -H "Content-Type: application/json" \
  -d '{"image":"test"}'
```

应该返回配置错误（因为没有有效图像），但证明端点可访问。

## API端点

### POST /api/chatgpt-decode

**请求格式:**
```json
{
  "image": "base64编码的图片数据",
  "imageType": "image/jpeg"
}
```

**成功响应:**
```json
{
  "success": true,
  "morseCode": ".- -... -.-. / -.. . ..-.",
  "timestamp": "2025-01-30T12:00:00.000Z"
}
```

**错误响应:**
```json
{
  "error": "Error type",
  "message": "Error description"
}
```

## 前端集成

ChatGPT-4按钮已集成到图像上传页面：

1. 用户上传图片
2. 点击"Try ChatGPT-4 Decode"按钮
3. 图片自动转换为base64并发送到后端
4. ChatGPT-4分析图片并提取Morse代码
5. 结果显示在页面上

## 错误处理

系统包含完整的错误处理：

- **网络错误**: 连接失败时的重试建议
- **API错误**: Poe API限制或配置问题
- **解析错误**: 图片无法识别时的手动输入选项
- **超时处理**: 长时间处理的用户反馈

## 成本和限制

- **Poe API**: 使用现有订阅积分，无额外费用
- **文件大小**: 支持最大10MB图片
- **处理时间**: 通常5-15秒
- **并发限制**: 受Poe API限制

## 监控和调试

查看Worker日志：

```bash
cd backend
npm run tail
```

日志包含：
- 请求接收确认
- Poe API调用状态
- 响应处理结果
- 错误详情

## 故障排除

### 常见问题

1. **POE_API_KEY未设置**
   ```
   Error: Configuration error - POE API key not configured
   ```
   解决：运行 `./setup-poe-key.sh`

2. **图片过大**
   ```
   Error: Image too large
   ```
   解决：前端会自动压缩，通常不会出现

3. **API调用失败**
   ```
   Error: Poe API error: 429
   ```
   解决：等待一段时间后重试，可能是速率限制

## 安全注意事项

- POE API Key存储为Cloudflare Worker secret
- 图片数据不会持久化存储
- 所有通信使用HTTPS加密
- CORS配置限制访问域名

## 更新和维护

要更新Worker代码：

```bash
cd backend
# 修改代码后
npm run deploy
```

要更换API Key：

```bash
cd backend
./setup-poe-key.sh  # 使用新的API Key
```