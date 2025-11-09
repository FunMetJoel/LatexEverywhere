import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        content: path.resolve(__dirname, 'src/content.js'),
      },
      output: {
        format: 'iife',
        entryFileNames: 'content.js',
      },
      // inlineDynamicImports: false,
    },

    chunkSizeWarningLimit: 1000,
  },
})