const {join} = require('path')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * Vite shared config, assign alias and root dir
 */
export default defineConfig({
  root: join(process.cwd(), './src/renderer'),
  build:{
    outDir: join(process.cwd(), 'dist/source/renderer'),
    rollupOptions: {
      output:{
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  },
  base: '',
  optimizeDeps: {
    exclude: require('./external-packages')
  },
  alias: {
    '@/': join(__dirname, '../src/renderer'),
  },
  plugins:[vue()]
})
