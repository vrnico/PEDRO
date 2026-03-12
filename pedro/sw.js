const CACHE_NAME = 'pedro-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './styles.css',
  './confetti.min.js',
  './app.js',
  './personalities.js',
  './celebrations.js',
  './assets/pedro-walk.gif',
  './icons/pedro-192.png',
  './icons/pedro-512.png',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
