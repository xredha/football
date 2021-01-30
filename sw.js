const CACHE_NAME = "mancity-v1";
let urlsToCache = [
  "/",
  "/index.html",
  "/views/home.html",
  "/views/member.html",
  "/views/nav.html",
  "/views/saved.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/img/gallery/1.webp",
  "/img/gallery/2.webp",
  "/img/gallery/3.webp",
  "/img/gallery/4.webp",
  "/img/gallery/5.webp",
  "/img/gallery/6.webp",
  "/img/icon/icon-72x72.png",
  "/img/icon/icon-128x128.png",
  "/img/icon/icon-144x144.png",
  "/img/icon/icon-192x192.png",
  "/img/icon/icon-256x256.png",
  "/img/icon/icon-512x512.png",
  "/js/components/footer.js",
  "/js/components/navbar.js",
  "/js/app.js",
  "/js/functions.js",
  "/js/main.js",
  "/js/materialize.min.js",
  "/js/nav.js",
  "https://fonts.gstatic.com/s/robotoslab/v12/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjojISmb2Rj.woff2",
  "https://fonts.googleapis.com/css2?family=Merriweather&family=Roboto+Slab&display=swap",
  "https://fonts.googleapis.com/icon?family=Material+Icons"
]

self.addEventListener('install', function(event) {
  // console.log("ServiceWorker: Menginstall...");

  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      // console.log("ServiceWorker: Membuka cache...");
      return cache.addAll(urlsToCache);
    })
  )
});

self.addEventListener('activate', function(event) {
  // console.log("Aktivasi service worker baru");

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request, {cacheName:CACHE_NAME})
      .then(function(response) {
        // console.log("ServiceWorker: Menarik data: ", event.request.url);
  
        if (response) {
          // console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }

        let fetchRequest = event.request.clone();
  
        // console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
        
        return fetch(fetchRequest)
          .then(function(response) {
            if (!response || response.status !== 200) {
              return response;
            }

            let responseToCache = response.clone();
            caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            })

            return response;
          })
      })
  );
});

self.addEventListener("push", function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }

  let options = {
    body: body,
    icon: 'img/icon/icon-512x512.png',
    vibrate: [100,50,100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});