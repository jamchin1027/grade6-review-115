(() => {
  const status = document.querySelector('#offlineStatus');
  const setStatus = (text, ready = false) => { if(status){ status.textContent = text; status.classList.toggle('is-ready', ready); } };
  if(!('serviceWorker' in navigator)){ setStatus('此瀏覽器不支援離線版'); return; }
  setStatus('正在下載離線版…');
  navigator.serviceWorker.addEventListener('message', event => { if(event.data?.type === 'OFFLINE_READY') setStatus('離線版已下載 ✓', true); });
  navigator.serviceWorker.register('./sw.js').then(reg => {
    navigator.serviceWorker.ready.then(() => {
      if(navigator.serviceWorker.controller) setStatus('離線版已下載 ✓', true);
    });
    reg.addEventListener('updatefound', () => setStatus('正在更新離線版…'));
  }).catch(() => setStatus('離線下載未完成，請保持網路再開一次'));
})();
