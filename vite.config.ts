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
      type: 'electron',
      main: 'dist/backend/index.js',
      entry: 'src/backend/index.ts',
      outDir: 'dist/backend',
      external: ['electron'],
      electron: {
        build: {
          cliOptions: {
            x64: true,
            arm64: true,
            mac: ['zip'],
            // linux: ['tar.gz'],
            win: ['7z'],
          },
          config: './electron-builder.config.js',
        },
        preload: {
          entry: 'src/preload/index.ts',
          outDir: 'dist/preload',
        },
      },
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
