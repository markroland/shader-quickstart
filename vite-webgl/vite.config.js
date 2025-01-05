import { defineConfig } from 'vite';
// import glsl from 'vite-plugin-glsl';
import path from 'path';

export default defineConfig({
  // plugins: [glsl()],
  root: './src',
  build: {
    outDir: path.resolve(__dirname, 'dist'),
  },
  server: {
    open: true
  }
});