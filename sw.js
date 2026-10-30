const CACHE_NAME = 'review-island-offline-20261030-idiom-1';
const ASSETS = [
  './', './index.html', './manifest.json', './icon.svg',
  './style.css?v=20261030-idiom1', './offline.js?v=20261030-idiom1',
  './data.js?v=20261030-idiom1', './bank.js?v=20261030-idiom1',
  './vocab-data.js?v=20261030-idiom1', './vocab.js?v=20261030-idiom1',
  './english-data.js?v=20261030-idiom1', './english.js?v=20261030-idiom1',
  './practice.js?v=20261030-idiom1', './quiz.js?v=20261030-idiom1',
  './text-answer.js?v=20261030-idiom1', './app.js?v=20261030-idiom1', './idiom-data.js?v=20261030-idiom1', './idioms.js?v=20261030-idiom1'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()).then(() => notifyClients('OFFLINE_READY')));
});
self.addEventListener('message', event => { if(event.data?.type === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('fetch', event => {
  const request = event.request;
  if(request.method !== 'GET') return;
  if(request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => { const copy=response.clone(); caches.open(CACHE_NAME).then(cache => cache.put('./index.html',copy)); return response; }).catch(() => caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
    if(new URL(request.url).origin === self.location.origin){ const copy=response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(request,copy)); }
    return response;
  })));
});
function notifyClients(type){self.clients.matchAll({type:'window',includeUncontrolled:true}).then(clients => clients.forEach(client => client.postMessage({type})));}
