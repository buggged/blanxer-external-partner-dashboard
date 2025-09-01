import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3010, // 3008 contain prod token, 3010 contain dev token
  },
  preview: {
    port: 3010,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${path.resolve(
          __dirname,
          'src/styles/index',
        )}";`,
      },
    },
  },
});
