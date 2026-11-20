import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite-plus";
const name = process.env.PROTO ?? "_scaffold";

/** Inline the single JS chunk so index.html also opens from file:// (Chromium
 * refuses module scripts fetched from file:// URLs). */
const inlineEntry = (): Plugin => ({
  name: "inline-entry",
  enforce: "post",
  generateBundle(_options, bundle) {
    const html = Object.values(bundle).find((file) => file.fileName === "index.html");
    if (!html || html.type !== "asset") return;
    let source = String(html.source).replaceAll(" crossorigin", "");
    for (const [fileName, chunk] of Object.entries(bundle)) {
      if (chunk.type !== "chunk" || !chunk.isEntry) continue;
      const tag = new RegExp(`<script type="module" src="\\./${fileName.replace(/[.]/g, "\\.")}"></script>`);
      const code = chunk.code.replaceAll("</script", "<\\/script");
      source = source.replace(tag, () => "");
      source = source.replace("</body>", () => `<script type="module">${code}</script></body>`);
      delete bundle[fileName];
    }
    html.source = source;
  },
});

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  base: "./",
  plugins: [react(), tailwindcss(), inlineEntry()],
  resolve: { alias: { "@": fileURLToPath(new URL("../../../src/web", import.meta.url)) } },
  build: { outDir: `/tmp/despensa16-proto/${name}`, emptyOutDir: true },
});
