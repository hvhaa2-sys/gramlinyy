import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // На части ПК `localhost` уходит в IPv6 и браузер не достучится — явно IPv4
    host: '127.0.0.1',
    port: 5173,
    strictPort: false,
    open: true,
  },
})
