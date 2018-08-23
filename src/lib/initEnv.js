Object.assign(process.env, {
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#Mobile_Tablet_or_Desktop
  ...process.env.IS_MOBILE_DEVICE === undefined && {
    IS_MOBILE_DEVICE: window.navigator.userAgent.includes('Mobi'),
  },
  // https://developers.google.com/web/fundamentals/app-install-banners/#detect-mode
  ...process.env.IS_PWA === undefined && {
    IS_PWA: matchMedia('(display-mode: standalone)').matches || navigator.standalone === true,
  },
});
