/* eslint-disable no-undef */
let webPush = require('web-push');

const vapidKeys = {
  "publicKey" : "BOTKxzqzCcWvoxToByL1UTtaeGI6GyV25sJbOoRX85ZqjC5rB2QT-HobT_39gEvySzCulKdDNQvWTIDcTtfOoYY",
  "privateKey" : "rsMzm5Hph9oNuXt3x3y3igD-kJSIp50r6nLTFrGXb-I"
};

webPush.setVapidDetails(
  'mailto:galihredha100@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

let pushSubscription = {
  "endpoint" : "https://fcm.googleapis.com/fcm/send/c_vxN5Pz96g:APA91bGip0cPg2RKSlhpWxyPl1LKENeSzCpNEfVPog-F0Oh7bMNbs6Sp1zwjFn0eLCfnFkpDas60zA8OgxtZUf4zIZjWXBvCcUDa1RAMV6Az_BNSG6U9GqsV1uDyxTAsD2dBAdUt2RS9",
  "keys": {
    "p256dh": "BOy9AZp9S3MmSFCQSMI/0xoUUAHntnKQfpQVzumOK4DVxFKRxxI3bufP+zbkphw6NTwWA838jRhbLFJ6X/LwrnE=",
    "auth": "B/2O8YwDcMaEE6P/sJjMVg=="
  }
};

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