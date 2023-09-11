import { join } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
import { VitePluginDoubleshot } from 'vite-plugin-doubleshot'

// https://vitejs.dev/config/
export default defineConfig({
  root: join(__dirname, 'src/frontend'),
  plugins: [
    vue(),
    VitePluginDoubleshot({
      type: 'node',
      main: 'dist/backend/index.js',
      entry: 'src/backend/index.ts',
      outDir: 'dist/backend',
    }),
    viteCompression({
      threshold: 10240,
    }),
  ],
  resolve: {
    alias: {
      '@frontend': join(__dirname, 'src/frontend'),
      '@backend': join(__dirname, 'src/backend'),
    },
  },
  base: './',
  build: {
    outDir: join(__dirname, 'dist/frontend'),
    emptyOutDir: true,
  },
})
