import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  server: {
    host: true,
  },
  preview: {
    host: true,
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
});