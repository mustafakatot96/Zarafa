import {defineConfig} from 'vite';

export default defineConfig({
  root: 'website',
  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
    host: '0.0.0.0',
    port: 3000
  },
});
