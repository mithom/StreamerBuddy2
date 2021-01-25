const {join} = require('path')
import { defineConfig } from 'vite'

/**
 * Vite shared config, assign alias and root dir
 */
export default defineConfig({
  //entry: 'src/main/background',
  alias: {
    '@/': join(__dirname, '../src/main'),
  },
  build:{
    outDir: 'dist/source/main',
    assetsDir: '.',
    rollupOptions: {
      input: 'src/main/background.ts',
      output:{
        format: 'cjs',
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      },

      external: require('./external-packages'),
    },
  }

})
