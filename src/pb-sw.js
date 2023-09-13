const staticCacheName = 'static-v.';
const expectedCaches = [
  staticCacheName
];
const offline = '/offline.html';
const files = [
  '/',
  'manifest.json',
  offline
];


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(staticCacheName)
    .then((cache) => cache.addAll(files))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((key) => {
        if (!expectedCaches.includes(key)) return caches.delete(key);
      })
    ))
  );
});

self.addEventListener('message',  (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        return await fetch(event.request);
      } catch (error) {
        console.log('Fetch failed; returning offline page instead.', error);
        const cache = await caches.open(staticCacheName);
        return await cache.match(offline);
      }
    })());
  }
});
