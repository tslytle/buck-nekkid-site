import sharp from 'sharp';
const out = process.argv[2];
const files = process.argv.slice(3);
const W = 320, H = 240, COLS = 3;
const rows = Math.ceil(files.length / COLS);
const tiles = [];
for (let i = 0; i < files.length; i++) {
  const buf = await sharp(`public/images/${files[i]}`).resize(W, H, { fit: 'cover' }).jpeg({ quality: 70 }).toBuffer();
  tiles.push({ input: buf, left: (i % COLS) * W, top: Math.floor(i / COLS) * H });
}
await sharp({ create: { width: W * COLS, height: H * rows, channels: 3, background: '#fff' } })
  .composite(tiles).jpeg({ quality: 72 }).toFile(out);
console.log('wrote', out, files.join(' | '));
