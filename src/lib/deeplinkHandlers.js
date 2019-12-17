const handlers = {};
let lastDeeplink = null;

export const KEY = 'deeplink';

export const runHandlersForDeeplink = (deeplink) => {
  const path = deeplink.params.pathMatch;
  if (!handlers || !handlers[path]) {
    lastDeeplink = deeplink;
    return;
  }

  handlers[deeplink.params.pathMatch](deeplink);
  lastDeeplink = null;
};

export const registerDeeplinkHandler = (handler, paths) => {
  let handlerExisted = false;
  paths.forEach((path) => {
    handlerExisted = handlers[path] && !handlerExisted;
    handlers[path] = handler;
  });
  if (lastDeeplink && !handlerExisted) runHandlersForDeeplink(lastDeeplink);
};

registerDeeplinkHandler((deeplink) => {
  localStorage.setItem(KEY, window.location.origin + deeplink.fullPath);
}, ['airgap']);
