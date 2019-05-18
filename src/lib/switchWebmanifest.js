import iosWebManifest from '../assets/ios.webmanifest';

if (process.env.IS_IOS) {
  const manifestLink = document.querySelector('link[rel=manifest]');
  manifestLink.href = iosWebManifest;
}
