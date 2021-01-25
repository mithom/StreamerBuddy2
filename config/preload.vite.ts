const {join} = require('path')
import { defineConfig } from 'vite'

/**
 * Vite shared config, assign alias and root dir
 */
export default defineConfig({
  //entry: 'src/preload/index',
  root: join(__dirname, '../src/preload'),
  alias: {
    '@/': join(__dirname, '../src/preload'),
  },
  build:{
    assetsDir: '.',
    outDir: 'dist/source/preload',
    rollupOptions: {
      input: 'src/preload/index.ts',
      external: require('./external-packages'),
      output:{
        format: 'cjs',
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      },
    },
  },
})
