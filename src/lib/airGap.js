import { TxBuilderHelper } from '@aeternity/aepp-sdk';
import { decode, encode } from 'rlp';

function encodeBase58Check(data) {
  return TxBuilderHelper.encode(data, 'cm').slice(3);
}

function decodeBase58Check(encodedData) {
  return TxBuilderHelper.decode(`cm_${encodedData}`, 'cm');
}

const AIR_GAP_VERSION = '2';
const AIR_GAP_TYPE = '0';
const AIR_GAP_PROTOCOL = 'ae';
const AIR_GAP_CALLBACK = 'https://base.aepps.com/airgap?d=';

const urlToPayload = (urlBroken, expectedMessageType) => {
  // TODO: Remove after releasing https://github.com/airgap-it/airgap-vault/pull/64
  const url = urlBroken.replace('airgap-wallet://?d=com/airgap?d=', AIR_GAP_CALLBACK);
  const raw = decode(decodeBase58Check(new URL(url).searchParams.get('d')));
  const version = raw[0].toString();
  if (version !== AIR_GAP_VERSION) throw new Error(`Unsupported AirGap protocol version: ${version}`);
  const type = raw[1].toString();
  if (type !== AIR_GAP_TYPE) throw new Error(`Unknown AirGap payload type: ${type}`);
  const [[magic1, messageType, currency, payload]] = raw[2];
  if (magic1.toString() !== '1') {
    throw new Error('Unknown AirGap sync link');
  }
  if (+messageType.toString() !== expectedMessageType) {
    throw new Error(`Not expected message type: ${messageType.toString()}`);
  }
  if (currency.toString() !== AIR_GAP_PROTOCOL) {
    throw new Error(`Currency should be equal to "${AIR_GAP_PROTOCOL}": ${currency.toString()}`);
  }
  return payload;
};

export const getPublicKeyByResponseUrl = (url) => {
  const [, , publicKey] = urlToPayload(url, 4);
  if (publicKey.length !== 64) throw new Error('Invalid public key length');
  return Buffer.from(Buffer.from(publicKey).toString(), 'hex');
};

export const getSignedTransactionByResponseUrl = (url) => {
  const [, signedTx] = urlToPayload(url, 6);
  return Buffer.from(signedTx).toString();
};

export const generateSignRequestUrl = (networkId, transaction, publicKey) => {
  const rlp = [
    AIR_GAP_VERSION,
    AIR_GAP_TYPE,
    [
      [
        '1',
        '5',
        AIR_GAP_PROTOCOL,
        [
          AIR_GAP_CALLBACK,
          publicKey,
          [
            networkId,
            transaction,
          ],
        ],
        'session-id',
      ],
    ],
  ];

  const url = new URL('airgap-vault://');
  url.searchParams.set('d', encodeBase58Check(encode(rlp)));
  return url.toString();
};

export const INSTALL_URL = 'https://airgap.it/';
