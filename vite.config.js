import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => ({
  build: {
    emptyOutDir: true,
    cssCodeSplit: true,
    sourcemap: mode === 'development',
    minify: mode === 'production' ? 'terser' : false,
    terserOptions: {
        compress: {
          warnings: false,
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        mangle: true,
        format: {
          comments: false,
        },
      },
    rollupOptions: {
      output: {
        // Optimize chunk splitting for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          animations: ['framer-motion'],
        },
        // Optimize asset naming for better caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    //   plugins: [
    //     // Inline critical CSS only in production
    //     ...(mode === 'production'
    //       ? [
    //           PluginCritical({
    //             criticalUrl: './dist/index.html',
    //             criticalBase: './dist/',
    //             criticalPages: [
    //               {
    //                 uri: '',       // root path
    //                 template: 'index', // points to dist/index.html
    //               },
    //             ],
    //             criticalConfig: {
    //               inline: true,
    //               width: 1300,
    //               height: 900,
    //             },
    //           }),
    //         ]
    //       : []),
    //   ],
    },
    // Enable tree shaking and dead code elimination
    target: 'esnext',
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  plugins: [
    react(),
    compression({ algorithm: 'gzip', ext: '.gz', threshold: 10240 }),
    compression({ algorithm: 'brotliCompress', ext: '.br', threshold: 10240 }),
  ],
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'three', '@react-three/fiber'],
  },
}));
