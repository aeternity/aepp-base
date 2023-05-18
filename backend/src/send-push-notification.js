import webPush from 'web-push';

export default async (pushApiSubscription) => {
  if (['not-available', 'errored', 'not-allowed'].includes(pushApiSubscription)) {
    throw new Error(`subscription not available, ${pushApiSubscription}`);
  }
  webPush.setVapidDetails(
    'https://github.com/aeternity/aepp-base/issues',
    process.env.VAPID_PUBLIC_KEY ?? 'BHkQhNWW2TKfKfxo7vAgXkZGcVOXGrjhIZJlN1hKp6abIjWJgO8FYPswXJ35XEuKw46O9yZ-8KmsZ4-TXNBePcw',
    process.env.VAPID_PRIVATE_KEY ?? 'mwSZbWF_yU_h1gXlqlBy9cOfkOF-Pa0jhHxbTFXdhFE',
  );
  const subscription = JSON.parse(pushApiSubscription);
  await webPush.sendNotification(subscription);
};
