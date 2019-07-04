import browserPathTracker from './browserPathTracker';
import connectionStatusTracker from './connectionStatusTracker';
import desktopGuide from './desktopGuide';
import languages from './languages';
import ledgerConnection from './ledgerConnection';
import modals from './modals';
import notificationOnRemoteConnection from './notificationOnRemoteConnection';
import observables from './observables';
import unlockWalletIfNotEncrypted from './unlockWalletIfNotEncrypted';

export default store => [
  connectionStatusTracker,
  languages,
  modals,
  observables,
  ...process.env.IS_MOBILE_DEVICE
    ? [
      browserPathTracker,
      notificationOnRemoteConnection,
      unlockWalletIfNotEncrypted,
    ]
    : [
      desktopGuide,
      ledgerConnection,
    ],
].forEach(plugin => plugin(store));
