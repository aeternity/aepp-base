import { get } from 'lodash-es';
import { AENS_DOMAIN } from './constants';

export const toUrl = url => new URL((/^\w+:\//.test(url) ? '' : 'http://') + url);

export const isAensName = value => value.endsWith(AENS_DOMAIN);

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

export const getAddressByNameEntry = nameEntry => ((nameEntry.pointers
  && nameEntry.pointers.find(({ key }) => key === 'account_pubkey')) || {}).id;
