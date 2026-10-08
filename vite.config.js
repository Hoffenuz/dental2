import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Vite exposes only VITE_* variables from the selected .env file. There are
// deliberately no baked-in project keys or production endpoints in this file.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: true
  }
});
