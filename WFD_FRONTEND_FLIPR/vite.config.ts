import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  // Backend URL
        changeOrigin: true,  // Necessary for CORS
        rewrite: (path) => path.replace(/^\/api/, '')  // Rewrites `/api` to '' before proxying
      }
    }
  },
  plugins: [react()],
});

