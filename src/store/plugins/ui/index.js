import browserPathTracker from './browserPathTracker';
import connectionStatusTracker from './connectionStatusTracker';
import desktopGuide from './desktopGuide';
import ledgerConnection from './ledgerConnection';
import modals from './modals';
import notificationForMnemonicBackup from './notificationForMnemonicBackup';
import notificationOnRemoteConnection from './notificationOnRemoteConnection';
import observables from './observables';
import unlockWalletIfNotEncrypted from './unlockWalletIfNotEncrypted';

export default store => [
  connectionStatusTracker,
  modals,
  observables,
  ...process.env.IS_MOBILE_DEVICE
    ? [
      browserPathTracker,
      notificationForMnemonicBackup,
      notificationOnRemoteConnection,
      unlockWalletIfNotEncrypted,
    ]
    : [
      desktopGuide,
      ledgerConnection,
    ],
].forEach(plugin => plugin(store));
