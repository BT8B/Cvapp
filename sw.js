/* CV Maker – offline service worker
   İlk yüklemede uygulama kabuğunu cache'ler; sonra offline açılır.
*/
var CACHE = 'cv-app-v3';
var SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './sw.js'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(SHELL.map(function (u) {
        return new Request(u, { cache: 'reload' });
      })).catch(function () {
        // Bazı ikonlar yoksa yine de devam
        return cache.addAll(['./', './index.html']);
      });
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE; }).map(function (k) {
          return caches.delete(k);
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;

  var url = event.request.url;

  // Sadece aynı origin + bilinen CDN
  var sameOrigin = url.indexOf(self.location.origin) === 0;
  var cdn = url.indexOf('cdnjs.cloudflare.com') !== -1 ||
            url.indexOf('fonts.googleapis.com') !== -1 ||
            url.indexOf('fonts.gstatic.com') !== -1;

  if (!sameOrigin && !cdn) return;

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      var networkFetch = fetch(event.request).then(function (res) {
        if (res && res.ok) {
          var clone = res.clone();
          caches.open(CACHE).then(function (cache) {
            try { cache.put(event.request, clone); } catch (e) { /* ignore */ }
          });
        }
        return res;
      }).catch(function () {
        return cached || caches.match('./index.html');
      });

      // Cache-first: offline için önce cache
      return cached || networkFetch;
    })
  );
});
