import {join}                           from 'path';
import {defineConfig, UserConfigExport} from 'vite';
import {node}                           from './electron-vendors';

/**
 * Vite shared config, assign alias and root dir
 */
export default (): UserConfigExport => {
  return defineConfig({
    resolve: {
      alias: {
        '@': join(process.cwd(), './src/main'),
      },
    },
    build: {
      target: `node${node}`,
      outDir: 'dist/source/main',
      assetsDir: '.',
      minify: process.env.MODE === 'development' ? false : 'terser',
      lib: {
        entry: 'src/main/background.ts',
        formats: ['cjs'],
      },
      rollupOptions: {
        output: {
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
};
