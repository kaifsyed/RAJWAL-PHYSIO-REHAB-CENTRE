import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.join(process.cwd(), "public", "images");
const exts = new Set([".jpg", ".jpeg", ".png"]);

function walk(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "originals" || e.name === "logo") continue;
      out = out.concat(walk(full));
    } else if (exts.has(path.extname(e.name).toLowerCase())) {
      out.push(full);
    }
  }
  return out;
}

const files = walk(root);
let converted = 0, skipped = 0;
for (const file of files) {
  const dir = path.dirname(file);
  const backupDir = path.join(dir, "originals");
  const base = path.basename(file, path.extname(file));
  const outPath = path.join(dir, base + ".webp");
  const backupPath = path.join(backupDir, path.basename(file));

  if (fs.existsSync(outPath)) {
    skipped++;
    if (!fs.existsSync(backupPath)) {
      if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
      fs.renameSync(file, backupPath);
    }
    continue;
  }
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
  await sharp(file).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toFile(outPath);
  fs.renameSync(file, backupPath);
  converted++;
  console.log("Converted", file);
}
console.log("Converted:", converted, "Skipped:", skipped, "Total:", files.length);