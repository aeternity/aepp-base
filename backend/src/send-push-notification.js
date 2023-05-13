import webPush from 'web-push';

export default async (pushApiSubscription) => {
  webPush.setVapidDetails(
    process.env.VAPID_SUBJECT,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY,
  );
  if (pushApiSubscription !== 'not-available') {
    const subscription = JSON.parse(pushApiSubscription);
    await webPush.sendNotification(subscription);
  }
};
