/* JAGOS background landing notifications (Firebase Cloud Messaging) */
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDto0AprR6IbnTNqNzZ3qt_-piJ_Cbqd_Y",
  authDomain: "jasmemo-3c59b.firebaseapp.com",
  projectId: "jasmemo-3c59b",
  storageBucket: "jasmemo-3c59b.firebasestorage.app",
  messagingSenderId: "891861551666",
  appId: "1:891861551666:web:0b96ffcead52c73676ca2b"
});

firebase.messaging();

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const notificationData = event.notification?.data || {};
  const target = notificationData.link || notificationData?.FCM_MSG?.fcmOptions?.link || "../";
  event.waitUntil((async () => {
    const windows = await clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const client of windows) {
      if ("focus" in client) {
        await client.focus();
        if ("navigate" in client) await client.navigate(target);
        return;
      }
    }
    if (clients.openWindow) await clients.openWindow(target);
  })());
});
