// https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#Mobile_Tablet_or_Desktop

if (process.env.IS_MOBILE_DEVICE === undefined) {
  Object.assign(process.env, {
    IS_MOBILE_DEVICE: window.navigator.userAgent.includes('Mobi')
  })
}
