import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import PluginCritical from 'rollup-plugin-critical'; // for critical CSS

export default defineConfig(({ mode }) => ({
  build: {
    emptyOutDir: true,
    cssCodeSplit: true,
    sourcemap: mode === 'development',
    minify: mode === 'production' ? 'terser' : false,
    rollupOptions: {
      plugins: [
        // Inline critical CSS only in production
        ...(mode === 'production'
          ? [
              PluginCritical({
                criticalUrl: './dist/index.html',
                criticalBase: './dist/',
                criticalPages: [
                  {
                    uri: '',       // root path
                    template: 'index', // points to dist/index.html
                  },
                ],
                criticalConfig: {
                  inline: true,
                  minify: true,
                  width: 1300,
                  height: 900,
                },
              }),
            ]
          : []),
      ],
    },
  },
  plugins: [
    react(),
    compression({ algorithm: 'gzip', ext: '.gz', threshold: 10240 }),
    compression({ algorithm: 'brotliCompress', ext: '.br', threshold: 10240 }),
  ],
}));
