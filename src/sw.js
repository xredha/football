/* eslint-disable no-undef */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

  workbox.routing.registerRoute(
    /(.*)gallery(.*)\.(?:webp)/,
    workbox.strategies.cacheFirst({
      cacheName: 'images-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        })
      ]
    })
  );

  /* GOOGLEAPIS */
  workbox.routing.registerRoute(
    new RegExp('https://fonts.googleapis.com'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-apis',
        cacheExpiration: {
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }
    })
  );

  /* GSTATIC */
  workbox.routing.registerRoute(
    new RegExp('https://fonts.gstatic.com'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'g-static',
        cacheExpiration: {
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }
    })
  );

  /* API FOOTBALL */
  workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'API-cache-football',
        cacheExpiration: {
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }
    })
  );

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

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