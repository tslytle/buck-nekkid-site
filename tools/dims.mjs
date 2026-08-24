import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
const dir = 'public/images';
for (const f of readdirSync(dir).sort()) {
  const m = await sharp(`${dir}/${f}`).metadata();
  console.log(`${f.padEnd(28)} ${String(m.width).padStart(5)}x${String(m.height).padEnd(5)} ${(statSync(`${dir}/${f}`).size/1024).toFixed(0).padStart(6)} KB`);
}
