const {join} = require('path');
import { defineConfig } from 'vite';

/**
 * Vite shared config, assign alias and root dir
 */
export default defineConfig({
  // root: join(process.cwd(), './src/preload'),
  alias: {
    '/@/': join(process.cwd(), './src/preload'),
  },
  build:{
    assetsDir: '.',
    outDir: 'dist/source/preload',
    minify: process.env.MODE === 'development' ? false : 'terser',
    lib: {
      entry: 'src/preload/index.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      // input: 'src/preload/index.ts',
      external: require('./external-packages').default,
      output:{
        format: 'cjs',
        entryFileNames: '[name].[format].js',
        chunkFileNames: '[name].[format].js',
        assetFileNames: '[name].[ext]',
      },
    },
    emptyOutDir: true,
  },
});
