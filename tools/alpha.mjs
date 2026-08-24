import sharp from 'sharp';
for (const f of process.argv.slice(2)) {
  const img = sharp(f);
  const m = await img.metadata();
  const stats = await img.stats();
  // sample the top-left corner pixel
  const { data } = await sharp(f).extract({ left: 0, top: 0, width: 1, height: 1 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  console.log(`${f}\n  channels=${m.channels} hasAlpha=${m.hasAlpha} isOpaque=${stats.isOpaque} corner_rgba=[${data.join(',')}]`);
}
