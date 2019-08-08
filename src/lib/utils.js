import { get } from 'lodash-es';

export const toUrl = url => new URL((/^\w+:\//.test(url) ? '' : 'http://') + url);

export const isAensName = value => value.endsWith('.test');

// eslint-disable-next-line no-console
export const handleUnknownError = error => console.warn('Unknown rejection', error);

export const isNotFoundError = error => error.isAxiosError
  && get(error, 'response.status') === 404;

export const isAccountNotFoundError = error => isNotFoundError(error)
  && get(error, 'response.data.reason') === 'Account not found';
