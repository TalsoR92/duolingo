import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/duolingo/', // Assurez-vous que cela correspond au nom de votre dépôt GitHub
});
