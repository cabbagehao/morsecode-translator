import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import http from 'http';
import serve from 'serve-handler';
import puppeteer from 'puppeteer';

async function prerender() {
  // 启动临时服务器
  const server = http.createServer((request, response) => {
    return serve(request, response, {
      public: './dist'
    });
  });

  server.listen(3000, async () => {
    console.log('Server running on http://localhost:3000');
    
    try {
      // 使用 Puppeteer
      
      const browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ]
      });

      const routes = [
        '/',
        '/learn',
        '/learn/basic-and-tips',
        '/learn/history',
        '/sheet',
        '/sheet/morse-code-sheet',
        '/sheet/common-abbr',
        '/sheet/common-words',
        '/sheet/common-phrases',
        '/decoders/txt-to-morse',
        '/decoders/decode-text',
        '/decoders/decode-image',
        '/decoders/decode-audio',
        '/shop'
      ];

      for (const route of routes) {
        const page = await browser.newPage();
        await page.goto(`http://localhost:3000${route}`, { 
          waitUntil: 'networkidle0',
          timeout: 30000
        });
        
        await page.waitForTimeout(2000);
        
        const html = await page.content();
        
        // 保存预渲染的 HTML
        const filePath = route === '/' ? 'index.html' : `${route.substring(1)}/index.html`;
        const fullPath = path.join('./dist', filePath);
        
        // 创建目录
        const dir = path.dirname(fullPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        fs.writeFileSync(fullPath, html);
        console.log(`Generated: ${fullPath}`);
        
        await page.close();
      }

      await browser.close();
      console.log('Prerendering completed!');
    } catch (error) {
      console.error('Prerendering failed:', error);
      process.exit(1);
    }
    
    server.close();
    process.exit(0);
  });
}

prerender();