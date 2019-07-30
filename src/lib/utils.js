export const toUrl = url => new URL((/^\w+:\//.test(url) ? '' : 'http://') + url);

export const isAensName = value => value.endsWith('.test');
