/* eslint-disable no-undef */
let webPush = require('web-push');

const vapidKeys = {
  "publicKey" : "BKUmTMbjLHpsa-wBTn4uiG4gcB3_FwC9uWzeaFpL0nVcbTE8ubR0EDgKONQMd41s4Wf3pjgif8CC6R5zwecZT-8",
  "privateKey" : "MpcrV0duUS7brv2lDtBmrRLz1RyC8UOu_Y0QDcUSmCo"
};

webPush.setVapidDetails(
  'mailto:galihredha100@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

let pushSubscription = {
  "endpoint" : "https://fcm.googleapis.com/fcm/send/fpi-M2InGw0:APA91bGsklrqwex7AxFDa4ks9Nkd5sd2hByG31g9-1DUihoE8XgCkiGXUJjQOUs5c9HSQxPjHmoCcdu3jH7z_oD_5b9L_3Oyqb9ekItYQyF-WuuvKRxwFXUuD-iEej6xT-oAu9hxN8Gs",
  "keys": {
    "p256dh": "BASz4+J1Q++tcZnTQbM/lQ/+wRzE0E+HIt0ybAw6+GK5KQQ4jqSTae8SC3l8vr1lsJGN6WN2GMLAX43QRGLNMIE=",
    "auth": "4D0Wd0AtF1G02d1t6IhxVQ=="
  }
};

let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
  gcmAPIKey: '27515173138',
  TTL: 60
};

webPush.sendNotification(
  pushSubscription,
  payload,
  options
);