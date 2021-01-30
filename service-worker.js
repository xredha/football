const myCache = "cache-v1";
let resourceToPrecache = [
  "/",
  "index.html",
  "views/nav.html",
  "views/herbivora.html",
  "views/karnivora.html",
  "views/insektivora.html",
  "views/omnivora.html",
  "assets/icon/icon-72x72.png",
  "assets/icon/icon-128x128.png",
  "assets/icon/icon-144x144.png",
  "assets/icon/icon-192x192.png",
  "assets/icon/icon-256x256.png",
  "assets/icon/icon-512x512.png",
  "assets/icon-header/ayam.png",
  "assets/icon-header/gajah.png",
  "assets/icon-header/harimau.png",
  "assets/icon-header/katak.png",
  "assets/img/herbivora/gajah.jpeg",
  "assets/img/herbivora/jerapah.jpeg",
  "assets/img/herbivora/kambing.jpeg",
  "assets/img/herbivora/keledai.jpeg",
  "assets/img/herbivora/kuda.jpeg",
  "assets/img/herbivora/sapi.jpeg",
  "assets/img/insektivora/bunglon.jpg",
  "assets/img/insektivora/cicak.jpg",
  "assets/img/insektivora/kadal.jpg",
  "assets/img/insektivora/katak.jpg",
  "assets/img/insektivora/laba-laba.jpg",
  "assets/img/insektivora/tokek.jpg",
  "assets/img/karnivora/anjing.jpeg",
  "assets/img/karnivora/beruang-madu.jpeg",
  "assets/img/karnivora/harimau.jpeg",
  "assets/img/karnivora/kucing.jpg",
  "assets/img/karnivora/serigala.jpeg",
  "assets/img/karnivora/singa.jpeg",
  "assets/img/omnivora/ayam.jpg",
  "assets/img/omnivora/beruang.jpg",
  "assets/img/omnivora/flamingo.jpg",
  "assets/img/omnivora/ikan-paus.jpg",
  "assets/img/omnivora/kura-kura.jpg",
  "assets/img/omnivora/landak.jpg",
  "css/materialize-css/materialize.min.css",
  "css/style.css",
  "js/components/navbar.js",
  "js/data/herbivora.js",
  "js/data/insektivora.js",
  "js/data/karnivora.js",
  "js/data/omnivora.js",
  "js/materialize-js/materialize.min.js",
  "js/app.js",
  "js/functions.js",
  "js/nav.js",
  "manifest.json",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "https://fonts.googleapis.com/css2?family=Sniglet&display=swap"
];

self.addEventListener("install", function(event){
  event.waitUntil(
      caches.open(myCache).then(function(cache){
          return cache.addAll(resourceToPrecache);
      })
  );
});

self.addEventListener("fetch", function(event) {
  // event.respondWith(
  //   caches.match(event.request)
  //     .then(function(response) {
  //       if (response) {
  //         console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
  //         return response;
  //       }
  //       console.log(
  //         "ServiceWorker: Memuat aset dari server: ",
  //         event.request.url
  //       );
  //       return fetch(event.request);
  //     })
  // );
  event.respondWith(
    caches.match(event.request, {cacheName:myCache})
      .then(function(response) {
        if (response) {
          return response;
        }
        let fetchRequest = event.request.clone();
        return fetch(fetchRequest)
          .then(function(response) {
            if (!response || response.status !== 200) {
              return response;
            }

            let responseToCache = response.clone();
            caches.open(myCache)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              })

            return response;
          })
      })
  );
})

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != myCache) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});