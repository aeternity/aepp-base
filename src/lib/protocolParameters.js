import { defaultProtocolParameters, getCachedProtocolParameters } from '@aeternity/aepp-sdk';
import { handleUnknownError } from './utils';

/**
 * Consensus parameters and node policy settings of the connected node, to price a transaction the
 * way the sdk priced the one it built against them.
 *
 * `getCachedProtocolParameters` already falls back to the parameters of the sdk release for a node
 * that doesn't provide the endpoints, can't be reached, or answers something it can't read. It
 * rejects only when node reports values far above the ones of the sdk release, and falling back
 * there keeps the wallet showing the same minimum fee it showed before the parameters were
 * requested at all — the transaction is serialized as it arrived either way, and node enforces its
 * own minimum.
 *
 * The result is cached per `Node` instance by the sdk, and the `node` getter is cached by vuex, so
 * this costs one request per network rather than one per transaction.
 * @param node - Node to request the parameters from
 */
export default async function getProtocolParameters(node) {
  try {
    return await getCachedProtocolParameters(node);
  } catch (error) {
    handleUnknownError(error);
    return defaultProtocolParameters;
  }
}
