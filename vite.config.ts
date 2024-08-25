import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Specify the output directory
    rollupOptions: {
      output: {
        // Configure manual chunking to optimize large bundles
        manualChunks: {
          vendor: ['react', 'react-dom'], // Split out common dependencies
          // Add more vendor or large libraries here if needed
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase chunk size limit warning if needed
  },
});
