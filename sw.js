const CACHE_NAME = 'king-app-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
  // Nota: No cacheamos Tailwind CDN aquí para evitar errores complejos de CORS, 
  // pero la app funcionará bien mientras haya tenido conexión una vez.
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