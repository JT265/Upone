const CACHE_NAME = 'upone-cache-v1';
const urlsToCache = [
  '/Upone/',
  '/Upone/index.html',
  '/Upone/manifest.json',
  '/Upone/upone_icon_512.png'
];

// Installation : Mise en cache des fichiers
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interception des requêtes : Servir depuis le cache si hors-ligne
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retourne le fichier en cache s'il existe, sinon le télécharge
        return response || fetch(event.request);
      })
  );
});

// Activation : Nettoyage des anciens caches si on met à jour la version
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
