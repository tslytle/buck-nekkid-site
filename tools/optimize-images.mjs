// One-off asset pass: downscale oversized photos and re-encode.
// Run with `npm run images` after adding new photos to public/images.
import sharp from 'sharp';
import { readdirSync, statSync, renameSync, unlinkSync } from 'fs';

const DIR = 'public/images';
const MAX_EDGE = 2000; // longest edge; heroes are object-fit:cover, so more is wasted bytes
let before = 0, after = 0;

for (const f of readdirSync(DIR).sort()) {
  const path = `${DIR}/${f}`;
  const size = statSync(path).size;
  before += size;
  const img = sharp(path);
  const meta = await img.metadata();
  const tmp = `${path}.tmp`;

  if (/\.png$/i.test(f)) {
    await img.png({ compressionLevel: 9, palette: true }).toFile(tmp);
  } else {
    await img
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80, progressive: true, mozjpeg: true })
      .toFile(tmp);
  }

  // Keep whichever is smaller — never let the pass make a file bigger.
  if (statSync(tmp).size < size) renameSync(tmp, path);
  else unlinkSync(tmp);

  const now = statSync(path).size;
  after += now;
  console.log(`${f.padEnd(28)} ${(size / 1024).toFixed(0).padStart(6)} KB -> ${(now / 1024).toFixed(0).padStart(6)} KB`);
}
console.log(`\ntotal ${(before / 1024 / 1024).toFixed(2)} MB -> ${(after / 1024 / 1024).toFixed(2)} MB`);
