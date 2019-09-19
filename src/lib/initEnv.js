Object.assign(process.env, {
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#Mobile_Tablet_or_Desktop
  ...process.env.IS_MOBILE_DEVICE === undefined && {
    IS_MOBILE_DEVICE: window.navigator.userAgent.includes('Mobi'),
  },
  // https://developers.google.com/web/fundamentals/app-install-banners/#detect-mode
  ...process.env.IS_PWA === undefined && {
    IS_PWA: matchMedia('(display-mode: standalone)').matches || navigator.standalone === true,
  },
  // https://stackoverflow.com/a/9039885
  ...process.env.IS_IOS === undefined && {
    IS_IOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
  },
  ...process.env.RUNNING_IN_FRAME === undefined && {
    RUNNING_IN_FRAME: window.parent !== window,
  },
  ...process.env.RUNNING_IN_POPUP === undefined && {
    RUNNING_IN_POPUP: !!window.opener && window.name === 'popup',
  },
});

Object.assign(process.env, {
  ...process.env.DISABLED_BROWSER === undefined && {
    DISABLED_BROWSER: process.env.IS_CORDOVA && process.env.IS_IOS,
  },
});
