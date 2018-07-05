// https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#Mobile_Tablet_or_Desktop

const { TARGET_DEVICE } = process.env

export default TARGET_DEVICE
  ? TARGET_DEVICE === 'mobile'
  : window.navigator.userAgent.includes('Mobi')
