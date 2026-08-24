// Fingerprinted asset paths, filled in by the build before any page renders.
//
// styles.css and main.js are cached hard (a year, immutable), which is only
// safe because their filenames carry a content hash — change the file and the
// URL changes, so a browser can never serve a stale copy. Without this, a
// deploy stays invisible to returning visitors until their cache expires.

export const assets = {
  css: '/styles.css',
  js: '/main.js',
};

export function setAssets(next) {
  Object.assign(assets, next);
}
