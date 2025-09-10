import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "path";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        content: path.resolve(__dirname, "src/content.js"),
      },
      output: {
        entryFileNames: `[name].js`, // keeps folder structure
        format: "iife",
        inlineDynamicImports: true,
        chunkFileNames: undefined
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: "src/manifest.json", dest: "." },
        { src: "src/background.js", dest: "." },
        { src: "src/popup/*.html", dest: "popup" },
        { src: "src/popup/*.css", dest: "popup" },
        { src: "src/popup/*.js", dest: "popup" },
        { src: "src/options/*.html", dest: "options" },
        { src: "src/options/*.css", dest: "options" },
        { src: "src/options/*.js", dest: "options" },
        { src: "src/lib/*.js", dest: "lib" },
        { src: "node_modules/katex/dist/katex.min.css", dest: "." },
        { src: "node_modules/katex/dist/katex.min.js", dest: "lib" }
      ],
    }),
  ],
});
