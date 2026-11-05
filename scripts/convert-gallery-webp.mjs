import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const galleryDir = path.join(process.cwd(), "public", "images", "gallery");
const backupDir = path.join(galleryDir, "originals");

const exts = new Set([".jpg", ".jpeg", ".png"]);

if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

const files = fs.readdirSync(galleryDir).filter((f) => {
  const full = path.join(galleryDir, f);
  return fs.statSync(full).isFile() && exts.has(path.extname(f).toLowerCase());
});

for (const file of files) {
  const input = path.join(galleryDir, file);
  const base = path.basename(file, path.extname(file));
  const output = path.join(galleryDir, base + ".webp");
  const backup = path.join(backupDir, file);

  if (fs.existsSync(output)) {
    // still move original to backup if not already
    if (!fs.existsSync(backup)) fs.renameSync(input, backup);
    continue;
  }

  await sharp(input)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(output);

  fs.renameSync(input, backup);
  console.log(`Converted ${file} -> ${base}.webp`);
}

console.log("Done");