import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const release = path.join(root, 'downloads');
const version = '20261128-final3';
const htmlPath = path.join(release, 'grade6-final-offline.html');
const source = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const scriptFiles = [...source.matchAll(/<script src="([^"]+\.js)\?v=[^"]+" defer><\/script>/g)]
  .map(match => match[1])
  .filter(file => file !== 'offline.js');
const styleFiles = [...source.matchAll(/<link rel="stylesheet" href="([^"]+\.css)\?v=[^"]+">/g)]
  .map(match => match[1]);
let html = source
  .replace(/<link rel="manifest"[^>]*>\s*/g, '')
  .replace(/<link rel="icon" href="icon\.svg"[^>]*>/, `<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(fs.readFileSync(path.join(root, 'icon.svg'), 'utf8'))}">`);

for (const file of styleFiles) {
  const css = fs.readFileSync(path.join(root, file), 'utf8').replace(/<\/style/gi, '<\\/style');
  html = html.replace(new RegExp(`<link rel="stylesheet" href="${file}\\?v=${version}">`), `<style data-bundled-from="${file}">\n${css}\n</style>`);
}

html = html.replace(/<script src="[^"]+\.js\?v=[^"]+" defer><\/script>\s*/g, '');
const scripts = scriptFiles.map(file => {
  const js = fs.readFileSync(path.join(root, file), 'utf8').replace(/<\/script/gi, '<\\/script');
  return `<script data-bundled-from="${file}">\n${js}\n</script>`;
}).join('\n');
html = html.replace('</body>', `${scripts}\n</body>`);
html = html.replace('<small id="offlineStatus">準備離線版…</small>', '<small id="offlineStatus">單機版 · 離線可玩</small>');
html = html.replace('<a href="grade6-final-app.zip" download>下載 APP</a>', '');
fs.mkdirSync(release, { recursive: true });
fs.writeFileSync(htmlPath, html, 'utf8');
console.log(`Built ${htmlPath} (${fs.statSync(htmlPath).size} bytes)`);
