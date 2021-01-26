const {join} = require('path');
import { defineConfig } from 'vite';

/**
 * Vite shared config, assign alias and root dir
 */
export default defineConfig({
  //entry: 'src/main/background',
  alias: {
    '/@/': join(process.cwd(), './src/main') + '/',
  },
  build:{
    outDir: 'dist/source/main',
    assetsDir: '.',
    minify: process.env.MODE === 'development' ? false : 'terser',
    lib: {
      entry: 'src/main/background.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      // input: 'src/main/background.ts',
      output:{
        format: 'cjs',
        entryFileNames: '[name].[format].js',
        chunkFileNames: '[name].[format].js',
        assetFileNames: '[name].[ext]',
      },
      external: require('./external-packages').default,
    },
    emptyOutDir: true,
  },
});
