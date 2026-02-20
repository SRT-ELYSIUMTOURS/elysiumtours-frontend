import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Split vendor chunks for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          redux: ['react-redux', '@reduxjs/toolkit', 'redux-persist'],
        }
      }
    },
    // Warn if any single chunk exceeds 600kb
    chunkSizeWarningLimit: 600
  },
  // Ensure clean base path for Vercel
  base: '/',
  server: {
    port: 5173,
    open: true
  },
  preview: {
    port: 4173
  }
})
