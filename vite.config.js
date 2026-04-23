import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
    plugins: [react({
        // Fast Refresh optimizado
        fastRefresh: true,
    }), cloudflare()],
    base: '/',
    // Optimizaciones de rendimiento
    build: {
        // Reducir el tamaño de los chunks
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks: {
                    'framer-motion': ['framer-motion'],
                    'react-vendor': ['react', 'react-dom'],
                }
            }
        }
    },
    // Mejor rendimiento en dev
    server: {
        hmr: {
            overlay: false
        }
    }
})