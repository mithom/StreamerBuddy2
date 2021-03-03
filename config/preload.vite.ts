import {join} from 'path';
import { defineConfig } from 'vite';
import {chrome} from './electron-dep-versions';

/**
 * Vite shared config, assign alias and root dir
 */
export default defineConfig({
  resolve:{
    alias: {
      '@': join(process.cwd(), './src/preload'),
    },
  },
  build:{
    target: `chrome${chrome}`,
    assetsDir: '.',
    outDir: 'dist/source/preload',
    minify: process.env.MODE === 'development' ? false : 'terser',
    lib: {
      entry: 'src/preload/index.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
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
