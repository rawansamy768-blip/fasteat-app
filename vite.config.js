 import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/fasteat-app/', // استبدلي fasteat-app باسم المستودع اللي هتسميه في GitHub
});