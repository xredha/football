if (!("serviceWorker" in navigator)) {
  console.error("ServiceWorker: Browser tidak mendukung.");
} else {
  registerServiceWorker();
  requestPermission();
}
/* REGISTER SERVICE WORKER */
function registerServiceWorker() {
  return navigator.serviceWorker
    .register("/sw.js")
    .then(registration => {
      console.log("ServiceWorker: Pendaftaran berhasil.");
      return registration;
    })
    .catch(error => console.error("ServiceWorker: Pendaftaran gagal. Error:", error));
}

/* CHECK FEATURE NOTIFICATION API */
function requestPermission() {
  if ('Notification' in window) {
    Notification.requestPermission()
    .then(function (result) {
      if (result === "denied") {
        console.log("Fitur notifikasi tidak diijinkan.");
        return;
      } else if (result === "default") {
        console.error("Pengguna menutup kotak dialog permintaan ijin.");
        return;
      }

      if (('PushManager' in window)) {
        navigator.serviceWorker.getRegistration()
        .then(function(registration) {
          registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array("BOTKxzqzCcWvoxToByL1UTtaeGI6GyV25sJbOoRX85ZqjC5rB2QT-HobT_39gEvySzCulKdDNQvWTIDcTtfOoYY")
          })
          .then(function(subscribe) {
            console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
            console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey('p256dh')))));
            console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey('auth')))));
          })
          .catch(error => console.error('Tidak dapat melakukan subscribe ', error.message));
        });
      }
    });
  }
}

/* STRING TO Uint8Array */
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}