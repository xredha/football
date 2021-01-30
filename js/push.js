let webPush = require('web-push');

const vapidKeys = {
  "publicKey" : "BOTKxzqzCcWvoxToByL1UTtaeGI6GyV25sJbOoRX85ZqjC5rB2QT-HobT_39gEvySzCulKdDNQvWTIDcTtfOoYY",
  "privateKey" : "rsMzm5Hph9oNuXt3x3y3igD-kJSIp50r6nLTFrGXb-I"
};

webPush.setVapidDetails(
  'mailto:galihredha100@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

let pushSubscription = {
  "endpoint" : "https://fcm.googleapis.com/fcm/send/eG4J5zTBaEE:APA91bEtajC7yYfc2LocyZY34aNeO7sKg6a20TosIbgVWH9gZXhI_OS_VACVdK15SQrWXzi3HFXqZ6m6N0xZiLFvVvy9PeiLgao_tFjGhABMS8rtD9HWCnlC_6CFKnC133rBpRWhl8sP",
  "keys": {
    "p256dh": "BG6jItr2LGjZaegx2kIO8hh79+6PsJTOd/qpbkzrysyetTsvcG034Nb82iWn0Xe1rLPJqZFiSZTR9smYDeZ/KQw=",
    "auth": "8/ER4hGuxFB+KobI8wewYQ=="
  }
}

let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
  gcmAPIKey: '1058476248599',
  TTL: 60
};

webPush.sendNotification(
  pushSubscription,
  payload,
  options
);