import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-eslint-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin()],
});
