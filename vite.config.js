import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "path";
import glob from "glob";

// Find all JS/TS files in src recursively
const entryFiles = glob.sync("src/**/*.{ts,js}").reduce((entries, file) => {
  const name = path.relative("src", file).replace(/\.ts$/, "").replace(/\.js$/, "");
  entries[name] = path.resolve(__dirname, file);
  return entries;
}, {});

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: entryFiles,

      output: {
        entryFileNames: "[name].js",
        format: "es",
        manualChunks: {
          katex: ['katex']  // put KaTeX in its own chunk
        }
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: "src/manifest.json", dest: "." },
        { src: "src/popup/*.html", dest: "popup" },
        { src: "src/popup/*.css", dest: "popup" },
        { src: "src/insertPopup/popup.html", dest: "insertPopup" },
        { src: "src/insertPopup/popup.css", dest: "insertPopup" },
        { src: "src/options/*.html", dest: "options" },
        { src: "src/options/*.css", dest: "options" },
        { src: "assets/*", dest: "assets" },
        { src: "node_modules/katex/dist/katex.min.css", dest: "." },
        { src: "node_modules/katex/dist/katex.min.js", dest: "lib" }
      ],
    }),
  ],
});
