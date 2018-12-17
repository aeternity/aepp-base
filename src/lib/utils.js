// eslint-disable-next-line import/prefer-default-export
export const toUrl = url => new URL((/^\w+:\//.test(url) ? '' : 'http://') + url);
