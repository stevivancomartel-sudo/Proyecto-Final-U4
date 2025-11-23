import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Configuración de Vite + Tailwind + React
export default defineConfig({
  base: '/Proyecto-Final-U4/', // <-- Correcto para GitHub Pages
  plugins: [react(), tailwindcss()],
});

