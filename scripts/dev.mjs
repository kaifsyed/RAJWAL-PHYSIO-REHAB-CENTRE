import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const convert = () => {
  const child = spawn("node", ["scripts/convert-all-webp.mjs"], { stdio: "inherit" });
  child.on("exit", () => {});
};

convert();

const watcher = fs.watch(path.join(process.cwd(), "public", "images"), { recursive: true }, (event, filename) => {
  if (!filename) return;
  const ext = path.extname(filename).toLowerCase();
  if ([".jpg", ".jpeg", ".png"].includes(ext)) {
    setTimeout(convert, 300);
  }
});

const next = spawn("npx", ["next", "dev"], { stdio: "inherit", shell: true });

next.on("exit", (code) => {
  watcher.close();
  process.exit(code ?? 0);
});