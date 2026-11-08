import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const dir = path.resolve("public/images");
const maxEdge = 1800;

const files = (await readdir(dir)).filter((name) => /\.(jpe?g|png|webp)$/i.test(name));

if (files.length === 0) {
  console.log("No images found in public/images");
  process.exit(0);
}

let before = 0;
let after = 0;

for (const name of files) {
  const full = path.join(dir, name);
  const input = await readFile(full);
  const pipeline = sharp(input)
    .rotate()
    .resize({ width: maxEdge, height: maxEdge, fit: "inside", withoutEnlargement: true });
  const ext = path.extname(name).toLowerCase();
  const output =
    ext === ".png"
      ? await pipeline.png({ compressionLevel: 9 }).toBuffer()
      : ext === ".webp"
        ? await pipeline.webp({ quality: 80 }).toBuffer()
        : await pipeline.jpeg({ quality: 80, mozjpeg: true }).toBuffer();

  await writeFile(full, output);
  before += input.length;
  after += output.length;
  console.log(`${name}: ${(input.length / 1024).toFixed(0)} KB -> ${(output.length / 1024).toFixed(0)} KB`);
}

console.log(`Total: ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB`);
