import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Change the port if needed
    strictPort: true,
    open: true,
  },
  define: {
    'process.env': {},
    global: 'window',
  },
  resolve: {
    alias: {
      '@': '/src', // Allows importing files using @
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true, // Enables Buffer globally
        }),
      ],
    },
  },
});
