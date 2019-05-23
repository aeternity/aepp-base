import { Crypto } from '@aeternity/aepp-sdk/es';

export const AIR_GAP_PAYLOAD_IDX = 3;
const AIR_GAP_PUBLIC_KEY_IDX = 0;

export const parseSyncCode = (syncCode) => {
  const encodedAccount = new URL(syncCode).searchParams.get('d');
  const decodedAccount = Crypto.decode(Crypto.decodeBase58Check(encodedAccount));
  const publicKey = decodedAccount[AIR_GAP_PAYLOAD_IDX][AIR_GAP_PUBLIC_KEY_IDX].toString();
  const address = Crypto.aeEncodeKey(publicKey).toString();

  return { publicKey, address };
};
