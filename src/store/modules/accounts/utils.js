import { RUNNING_IN_FRAME } from '../../../lib/constants';
import { swallowModalAborted } from '../../plugins/ui/modals';

// eslint-disable-next-line import/prefer-default-export
export const getDesktopRemoteSignAction = (methodName, payloadField) => ({ dispatch }, payload) => {
  const remoteController = new AbortController();
  const signPromise = dispatch(
    'remoteConnection/call',
    { name: methodName, args: [payload[payloadField]], signal: remoteController.signal },
    { root: true },
  ).catch((error) => {
    if (error.message === 'Request aborted') throw new Error('Cancelled by user');
    throw error;
  });
  if (RUNNING_IN_FRAME) return signPromise;
  const modalController = new AbortController();
  dispatch('modals/open', { name: 'cancelSign', signal: modalController.signal }, { root: true })
    .then(() => remoteController.abort())
    .catch(swallowModalAborted);
  return signPromise.finally(() => modalController.abort());
};
