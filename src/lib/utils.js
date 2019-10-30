import { get } from 'lodash-es';

export const toUrl = url => new URL((/^\w+:\//.test(url) ? '' : 'http://') + url);

export const isAensName = value => !value.includes('.');

// eslint-disable-next-line no-console
export const handleUnknownError = error => console.warn('Unknown rejection', error);

export const isNotFoundError = error => error.isAxiosError
  && get(error, 'response.status') === 404;

export const isAccountNotFoundError = error => isNotFoundError(error)
  && get(error, 'response.data.reason') === 'Account not found';

export class ConvertibleToString {
  constructor(toString) {
    this.toString = toString;
  }
}

export class DOMRect {
  constructor(left, top, width, height) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    Object.freeze(this);
  }

  get right() { return this.left + this.width; }

  get bottom() { return this.top + this.height; }
}

export const removeTopDomain = name => name.replace(/\.[^.]*$/, '');

export const isAensAuctionsSupported = nodeInfo => nodeInfo.consensusProtocolVersion >= 4
  && nodeInfo.version.startsWith('5.') && nodeInfo.version !== '5.0.0-rc.1';

export const getAensDomain = nodeInfo => (isAensAuctionsSupported(nodeInfo) ? '.chain' : '.test');
