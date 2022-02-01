// eslint-disable-next-line import/prefer-default-export
export const getDesktopRemoteSignAction = (methodName) => ({ dispatch }, payload) => {
  const signPromise = dispatch(
    'remoteConnection/call',
    { name: methodName, args: [payload] },
    { root: true },
  );
  if (process.env.RUNNING_IN_FRAME) return signPromise;
  const cancelSignPromise = dispatch('modals/open', { name: 'cancelSign' }, { root: true })
    .then(() => signPromise.cancel());
  return signPromise.finally(() => cancelSignPromise.cancel());
};
