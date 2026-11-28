import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const release = path.join(root, 'downloads');
const version = '20261128-final3';
const htmlPath = path.join(release, 'grade6-final-offline.html');
const readmePath = path.join(release, 'offline-readme-zh.txt');
const zipPath = path.join(root, 'grade6-final-offline.zip');
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
fs.mkdirSync(release, { recursive: true });
fs.writeFileSync(htmlPath, html, 'utf8');
fs.writeFileSync(readmePath, [
  '六上期末升級打怪版｜單機版',
  '',
  '使用方式：解壓縮後，用 Chrome、Edge 或 Firefox 開啟 grade6-final-offline.html。',
  '開啟後不需要網路；五科題目與教學已包含在單一 HTML 檔案中。',
  '',
  '遊戲進度只保存在目前瀏覽器的本機資料中，不會上傳。若更換裝置或瀏覽器，',
  '請先到「學習紀錄備份」匯出 JSON，再於另一台裝置匯入。',
  '',
  '範圍：國語 7–10 課、數學單元 5–6、英文 Unit 3、社會第三單元、自然第三單元。'
].join('\n'), 'utf8');
if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
execFileSync('tar.exe', ['-a', '-c', '-f', zipPath, '-C', release, 'grade6-final-offline.html', 'offline-readme-zh.txt']);
console.log(`Built ${htmlPath} (${fs.statSync(htmlPath).size} bytes)`);
console.log(`Built ${zipPath} (${fs.statSync(zipPath).size} bytes)`);
