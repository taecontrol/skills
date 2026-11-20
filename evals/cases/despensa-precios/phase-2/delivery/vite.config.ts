import { fileURLToPath } from "node:url";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

// Local capture fixture only: the normal dev gate has one hardcoded member.
// The operations, runtime and D1 are unchanged. Request headers select the
// local household member and a controlled merge time for the worked examples.
export default defineConfig({
  plugins: [
    { name: "capture-members-and-clock", enforce: "pre", transform(source, id) {
      if (id.endsWith("/src/worker/access.ts")) return source.replace('"local@despensa.localhost"', 'request.headers.get("x-capture-member") ?? "member@example.com"');
      if (id.endsWith("/src/worker/index.ts")) return source.replace('import { Effect, Layer }', 'import { Effect, Layer, Clock }').replace('const services = Layer.merge(', 'const services = Layer.mergeAll(').replace('Layer.succeed(Member, admission.member),', 'Layer.succeed(Member, admission.member),\n Layer.effect(Clock.Clock, Clock.clockWith((clock) => Effect.succeed(Object.assign(Object.create(clock), { currentTimeMillisUnsafe: () => Date.parse(request.headers.get("x-capture-time") ?? "2026-11-02T17:06:00Z"), currentTimeMillis: Effect.succeed(Date.parse(request.headers.get("x-capture-time") ?? "2026-11-02T17:06:00Z")) })))),');
    } },
    react(), tailwindcss(), cloudflare({ configPath: "./wrangler.jsonc", persistState: { path: ".work/delivery/local-state" }, inspectorPort: 0 }),
  ],
  resolve: { alias: { "@": fileURLToPath(new URL("../../src/web", import.meta.url)) } },
  server: { host: true, port: 0 },
});
