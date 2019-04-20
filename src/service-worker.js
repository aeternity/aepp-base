/* global workbox clients */
/* eslint no-restricted-globals: 0 */
// eslint-disable-next-line no-underscore-dangle
workbox.precaching.precacheAndRoute(self.__precacheManifest);

self.addEventListener('push', (event) => {
  const title = 'Remote device requests to sign a transaction';
  const options = {
    body: 'Confirm transaction signing in Base æpp',
    icon: 'favicons/android-chrome-192x192.png',
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil((async () => {
    const clientList = await clients.matchAll({
      includeUncontrolled: true,
      type: 'window',
    });
    if (clientList.length) {
      await clientList[0].focus();
      return;
    }

    await clients.openWindow('/');
  })());
});
