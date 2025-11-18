const CACHE_NAME = 'king-app-v2'; // Cambié v1 a v2 para forzar actualización
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './KING%20ICONO%202.png' // Añadida tu imagen al caché (espacios con %20)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos cacheados');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Limpiar cachés antiguos cuando se activa un nuevo service worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
