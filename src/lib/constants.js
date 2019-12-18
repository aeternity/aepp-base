export const MAGNITUDE = 18;
export const MAGNITUDE_EXA = 18;
export const MAGNITUDE_GIGA = 9;
export const MAGNITUDE_MICRO = -6;
export const MAGNITUDE_PICO = -12;

export const AENS_DOMAIN = '.chain';
export const MAX_AUCTION_NAME_LENGTH = 12 + AENS_DOMAIN.length;

export const NAME_LIST_ROUTE_NAMES = ['name-list', 'auction-list', 'auction-list-character-length'];

export const PROTOCOLS_ALLOWED = [
  'https:',
  ...window.location.protocol === 'https:' ? [] : ['http:'],
];
export const PROTOCOL_DEFAULT = window.location.protocol === 'https:'
  || process.env.NODE_ENV === 'production' ? 'https:' : 'http:';

export const ROUTE_MOBILE_LOGGED_IN = { name: 'transfer' };
