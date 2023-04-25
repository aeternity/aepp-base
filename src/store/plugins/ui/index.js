import appsMetadata from './appsMetadata';
import pathTracker from './pathTracker';
import connectionStatusTracker from './connectionStatusTracker';
import desktopGuide from './desktopGuide';
import languages from './languages';
import currencies from './currencies';
import ledgerConnection from './ledgerConnection';
import modals from './modals';
import names from './names';
import notificationOnRemoteConnection from './notificationOnRemoteConnection';
import observables from './observables';
import unlockWalletIfNotEncrypted from '../unlockWalletIfNotEncrypted';
import veeValidate from './veeValidate';
import urlRequestHandler from './urlRequestHandler';
import notFoundPage from './notFoundPage';

export default (store) => [
  appsMetadata,
  connectionStatusTracker,
  languages,
  currencies,
  modals,
  names,
  observables,
  veeValidate,
  ...ENV_MOBILE_DEVICE
    ? [
      pathTracker,
      notificationOnRemoteConnection,
      unlockWalletIfNotEncrypted,
      urlRequestHandler,
    ]
    : [
      desktopGuide,
      ledgerConnection,
    ],
  notFoundPage,
].forEach((plugin) => plugin(store));
