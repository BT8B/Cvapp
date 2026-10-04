/* CV programı – service worker
   Sürüm değişince CACHE adını artır (v2, v3...) ki eski önbellek temizlensin. */
const CACHE = 'cv-app-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

function cacheable(res) {
  return res && (res.status === 200 || res.type === 'opaque');
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // Sayfanın kendisi: önce ağ (güncelleme gelsin), olmazsa önbellek
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(function (res) {
        if (cacheable(res)) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put('./index.html', copy); }); }
        return res;
      }).catch(function () {
        return caches.match('./index.html').then(function (r) { return r || caches.match('./'); });
      })
    );
    return;
  }

  // Diğer dosyalar (ikonlar, PDF kütüphaneleri, fontlar): önbellekten ver, arkada yenile
  e.respondWith(
    caches.match(req).then(function (cached) {
      var net = fetch(req).then(function (res) {
        if (cacheable(res)) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); }
        return res;
      }).catch(function () { return cached; });
      return cached || net;
    })
  );
});
