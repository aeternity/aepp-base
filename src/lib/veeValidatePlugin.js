import { Validator, install as VeeValidate } from 'vee-validate/dist/vee-validate.minimal.esm';
import {
  confirmed, decimal, excluded, min, required,
} from 'vee-validate/dist/rules.esm';
import BigNumber from 'bignumber.js';
import { Crypto } from '@aeternity/aepp-sdk/es';
import { validateMnemonic } from '@aeternity/bip39';
import { toUrl } from './utils';
import { parseSyncCode } from './vaultSyncCodeParser';

Validator.extend('confirmed', confirmed);
Validator.extend('decimal', decimal);
Validator.extend('excluded', excluded);
Validator.extend('min', min);
Validator.extend('required', required);

Validator.extend('address', value => Crypto.isAddressValid(value));
Validator.extend('max_value', (value, [arg]) => BigNumber(value).isLessThanOrEqualTo(arg));
Validator.extend('min_value', (value, [arg]) => BigNumber(value).isGreaterThanOrEqualTo(arg));
Validator.extend('min_value_exclusive', (value, [arg]) => BigNumber(value).isGreaterThan(arg));
Validator.extend('mnemonic', value => validateMnemonic(value));
Validator.extend('url_http', (value) => {
  try {
    const url = toUrl(value);
    return ['http:', 'https:'].includes(url.protocol);
  } catch (e) {
    return false;
  }
});
Validator.extend('sync_code', (value) => {
  try {
    parseSyncCode(value);
    return true;
  } catch (e) {
    return false;
  }
});

Validator.localize('en', {
  messages: {
    confirmed: () => 'Passwords don\'t match, try again',
    decimal: (field, [decimals = '*'] = []) => `This field must be numeric and may contain ${!decimals || decimals === '*' ? '' : decimals} decimal points`,
    excluded: () => 'This field must be a valid value.',
    min: (field, [length]) => `This field must be at least ${length} characters`,
    required: 'This field is required',

    address: () => 'Invalid AE Address',
    max_value: (field, [arg]) => `This field must be ${arg} or less`,
    min_value: (field, [arg]) => `This field must be ${arg} or more`,
    min_value_exclusive: (field, [arg]) => `This field must be more than ${arg}`,
    mnemonic: () => 'Invalid recovery phrase',
    url_http: () => 'This field is not a valid HTTP(S) URL',
    sync_code: () => 'This is not a valid sync code.',
  },
});

export default {
  install: Vue => Vue.use(VeeValidate),
};
