const urlsToCache = [
    '/',
    'https://msdeus.site/17077/Radar/bundle.js'
]
  
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('my-first-cache-v1')
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
        })
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            console.log('from cache')
            return response;
          }

          return fetch(event.request);
        }
      )
    )
  })