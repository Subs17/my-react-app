import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@fullcalendar/react', 
      '@fullcalendar/daygrid', 
      '@fullcalendar/timegrid', 
      '@fullcalendar/interaction'
    ],
  },
  server: {
    proxy: {
      '/uploads': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})
