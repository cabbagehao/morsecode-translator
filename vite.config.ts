import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // 确保 React Fast Refresh 正确配置
      fastRefresh: true,
      // 禁用自动JSX runtime以避免preamble问题
      jsxRuntime: 'automatic',
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  server: {
    host: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  preview: {
    host: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    copyPublicDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html',
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          lucide: ['lucide-react'],
          audio: ['tesseract.js'],
        },
      },
    },
  },
  publicDir: 'public',
  assetsInclude: ['**/*.xml', '**/*.txt'], // Explicitly include XML and TXT files
  // 移除可能导致问题的define配置
  esbuild: {
    // 确保JSX转换正确
    jsx: 'automatic',
  },
});