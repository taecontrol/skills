// Evidence for the final prototype: serves /tmp/despensa-20-proto on a free
// port, drives headless Chromium over CDP, and writes PNGs to final/evidence.
// Usage: node proto/capture.mjs
import { spawn } from "node:child_process";
import { createReadStream, existsSync, statSync } from "node:fs";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { extname, join, normalize } from "node:path";

const root = "/tmp/despensa-20-proto";
const output = `${root}/final/evidence`;
await mkdir(output, { recursive: true });

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".woff2": "font/woff2",
  ".json": "application/json",
};
const server = createServer((request, response) => {
  const path = normalize(decodeURIComponent(new URL(request.url, "http://x").pathname));
  const file = join(root, path);
  if (!file.startsWith(root) || !existsSync(file) || statSync(file).isDirectory()) {
    response.writeHead(404);
    response.end();
    return;
  }
  response.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(response);
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;

const profile = await mkdtemp(join(tmpdir(), "despensa-20-final-chromium-"));
const chrome = spawn(
  "/usr/bin/chromium",
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-background-networking",
    `--user-data-dir=${profile}`,
    "--remote-debugging-port=0",
    "about:blank",
  ],
  { stdio: ["ignore", "ignore", "pipe"] },
);
const cdpUrl = await new Promise((resolve, reject) => {
  chrome.once("error", reject);
  chrome.stderr.on("data", (data) => {
    const match = String(data).match(/DevTools listening on (ws:\/\/\S+)/);
    if (match) resolve(match[1]);
  });
});
const browser = new WebSocket(cdpUrl);
await new Promise((resolve, reject) => {
  browser.addEventListener("open", resolve, { once: true });
  browser.addEventListener("error", reject, { once: true });
});
let nextId = 0;
const pending = new Map();
const consoleMessages = [];
browser.addEventListener("message", (message) => {
  const data = JSON.parse(String(message.data));
  if (data.id) {
    const request = pending.get(data.id);
    pending.delete(data.id);
    if (data.error) request.reject(new Error(JSON.stringify(data.error)));
    else request.resolve(data.result);
  } else if (data.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(data.params.type)) {
    consoleMessages.push(`${data.params.type}: ${data.params.args.map((a) => a.value ?? a.description).join(" ")}`);
  } else if (data.method === "Runtime.exceptionThrown") {
    consoleMessages.push(`exception: ${data.params.exceptionDetails.text} ${data.params.exceptionDetails.exception?.description ?? ""}`);
  }
});
const call = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject });
    browser.send(JSON.stringify({ id, method, params, sessionId }));
  });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const { targetId } = await call("Target.createTarget", { url: "about:blank" });
const { sessionId } = await call("Target.attachToTarget", { targetId, flatten: true });
const page = (method, params) => call(method, params, sessionId);
await page("Page.enable");
await page("Runtime.enable");
const evaluate = async (expression) => {
  const result = await page("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
};
const size = async (width, height) => {
  await page("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 600,
  });
};
const open = async (scenario) => {
  await page("Page.navigate", { url: `${origin}/final/index.html?escenario=${scenario}` });
  await sleep(700);
  await evaluate("document.fonts.ready.then(() => true)");
  await sleep(150);
};
const clickText = async (text, selector = "button,[role=option],[cmdk-item],[role=radio],[role=tab]") => {
  const point = await evaluate(`(() => {
    const el = Array.from(document.querySelectorAll(${JSON.stringify(selector)})).find((e) =>
      e.offsetParent !== null && (e.textContent.trim().replace(/\\s+/g, " ") === ${JSON.stringify(text)} || (e.hasAttribute("cmdk-item") && e.textContent.includes(${JSON.stringify(text)}))));
    if (!el) return null;
    el.scrollIntoView({ block: "center" });
    const r = el.getBoundingClientRect();
    return [r.x + r.width / 2, r.y + r.height / 2];
  })()`);
  if (!point) throw new Error(`no element with text ${text}`);
  const [x, y] = point;
  await page("Input.dispatchMouseEvent", { type: "mouseMoved", x, y });
  await page("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 });
  await page("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 });
  await sleep(500);
};
const overflow = () =>
  evaluate(`(() => {
    const wide = [];
    const limit = document.documentElement.clientWidth;
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && (r.right > limit + 1 || r.left < -1) && getComputedStyle(el).position !== "fixed" && !el.closest(".overflow-x-auto"))
        wide.push(el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.split(" ").slice(0, 3).join(".") : ""));
    }
    return { scrollWidth: document.documentElement.scrollWidth, clientWidth: limit, wide: wide.slice(0, 5) };
  })()`);
const shot = async (name) => {
  const { data } = await page("Page.captureScreenshot", { format: "png" });
  await writeFile(`${output}/${name}.png`, Buffer.from(data, "base64"));
  const flow = await overflow();
  const note = flow.scrollWidth > flow.clientWidth || flow.wide.length ? ` OVERFLOW ${JSON.stringify(flow)}` : "";
  console.log(`${name}${note}`);
};

const scenarios = [
  "elegir", "arroz", "arroz-coto", "lucchetti-1kg", "jabon", "leche", "desodorante",
  "queso", "analgesico", "sin-compras", "cargando", "error",
];
const sizes = [[390, 844], [1440, 900]];
try {
  for (const [width, height] of sizes) {
    await size(width, height);
    for (const scenario of scenarios) {
      await open(scenario);
      await shot(`${scenario}-${width}`);
    }
    await open("arroz");
    await clickText("ARS");
    await shot(`arroz-ars-${width}`);
    await clickText("Ver las 12 compras");
    await shot(`arroz-ars-historial-${width}`);
    await open("arroz");
    await clickText("Cambiar");
    await shot(`arroz-cambiar-${width}`);
    await clickText("Arroz largo fino Lucchetti 1 kg", "[cmdk-item]");
    await shot(`arroz-cambiar-elegido-${width}`);
    await open("arroz");
    await clickText("Ver las 12 compras");
    await shot(`arroz-historial-${width}`);
    await evaluate("window.scrollTo(0, 0); document.querySelector('main').scrollTo(0, 1e6); true");
    await sleep(200);
    await shot(`arroz-historial-final-${width}`);
    await open("jabon");
    await clickText("Por litro");
    await shot(`jabon-litro-${width}`);
    await open("arroz-coto");
    await clickText("ARS");
    await shot(`arroz-coto-ars-${width}`);
  }
  for (const [width, height] of [[1024, 900], [1280, 900]]) {
    await size(width, height);
    await open("arroz");
    await shot(`arroz-${width}`);
    await open("elegir");
    await shot(`elegir-${width}`);
  }
  console.log(consoleMessages.length ? `CONSOLE:\n${consoleMessages.join("\n")}` : "console clean");
} finally {
  browser.close();
  chrome.kill("SIGTERM");
  await new Promise((resolve) => chrome.once("exit", resolve));
  server.close();
  await rm(profile, { recursive: true, force: true });
}
