import {join} from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import {chrome} from './electron-dep-versions';

/**
 * Vite shared config, assign alias and root dir
 */
export default defineConfig({
  root: join(process.cwd(), './src/renderer'),
  resolve:{
    alias: {
      '@': join(process.cwd(), './src/renderer'),
    },
  },
  build:{
    target: `chrome${chrome}`,
    polyfillDynamicImport: false,
    outDir: join(process.cwd(), 'dist/source/renderer'),
    assetsDir: '.',
    rollupOptions: {
      // output:{
      //   entryFileNames: `[name].js`,
      //   chunkFileNames: `[name].js`,
      //   assetFileNames: `[name].[ext]`
      // }
      external: require('./external-packages').default,
    },
    emptyOutDir: true,
  },
  base: '',
  plugins:[vue()],
});
