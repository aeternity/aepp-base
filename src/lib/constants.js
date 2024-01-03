export const MAGNITUDE = 18;
export const MAGNITUDE_EXA = 18;
export const MAGNITUDE_GIGA = 9;
export const MAGNITUDE_MICRO = -6;
export const MAGNITUDE_PICO = -12;

export const AENS_DOMAIN = '.chain';
export const MAX_AUCTION_NAME_LENGTH = 12 + AENS_DOMAIN.length;

export const NAME_LIST_ROUTE_NAMES = ['name-list', 'auction-list', 'auction-list-character-length'];

export const ROUTE_MOBILE_LOGGED_IN = { name: 'transfer' };

// https://developers.google.com/web/fundamentals/app-install-banners/#detect-mode
export const IS_PWA = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

// https://stackoverflow.com/a/9039885
export const IS_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

export const RUNNING_IN_FRAME = window.parent !== window;

export const RUNNING_IN_POPUP = !!window.opener && window.name === 'popup';
