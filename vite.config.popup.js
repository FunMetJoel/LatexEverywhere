import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        content: path.resolve(__dirname, 'src/insertPopup/popup.js'),
      },
      output: {
        format: 'iife',
        entryFileNames: 'insertPopup/popup.js',
      },
      // inlineDynamicImports: false,
    },

    chunkSizeWarningLimit: 1000,
  },
})