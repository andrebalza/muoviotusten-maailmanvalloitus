const CACHE_NAME = 'muoviotukset-offline-v1';
const OFFLINE_URL = '/offline.html';
const PRECACHE_URLS = [
  OFFLINE_URL,
  '/public/assets/icons/app-icon-192.png'
];

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache){
        return cache.addAll(PRECACHE_URLS);
      })
      .then(function(){
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys()
      .then(function(keys){
        return Promise.all(keys.map(function(key){
          return key === CACHE_NAME ? null : caches.delete(key);
        }));
      })
      .then(function(){
        return self.clients.claim();
      })
  );
});

self.addEventListener('fetch', function(event){
  const request = event.request;

  if(request.method !== 'GET' || request.mode !== 'navigate'){
    return;
  }

  const url = new URL(request.url);
  if(url.origin !== self.location.origin){
    return;
  }

  event.respondWith(
    fetch(request).catch(function(){
      return caches.match(OFFLINE_URL);
    })
  );
});
