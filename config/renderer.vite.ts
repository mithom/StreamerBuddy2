const {join} = require('path');
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

/**
 * Vite shared config, assign alias and root dir
 */
export default defineConfig({
  root: join(process.cwd(), './src/renderer'),
  alias: {
    '/@/': join(__dirname, './src/renderer') + '/',
  },
  build:{
    target: 'es2015',
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
