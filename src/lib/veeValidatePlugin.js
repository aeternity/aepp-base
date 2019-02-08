import VeeValidate, { Validator } from 'vee-validate';
import BigNumber from 'bignumber.js';
import { Crypto } from '@aeternity/aepp-sdk/es';
import { validateMnemonic } from '@aeternity/bip39';
import { toUrl } from './utils';

Validator.extend('min_value_exclusive', (value, [min]) => BigNumber(value).isGreaterThan(min));
Validator.extend('min_value', (value, [max]) => BigNumber(value).isGreaterThanOrEqualTo(max));
Validator.extend('max_value', (value, [max]) => BigNumber(value).isLessThanOrEqualTo(max));
Validator.extend('url_http', (value) => {
  try {
    const url = toUrl(value);
    return ['http:', 'https:'].includes(url.protocol);
  } catch (e) {
    return false;
  }
});
Validator.extend('address', value => Crypto.isAddressValid(value));
Validator.extend('mnemonic', value => validateMnemonic(value));

export default {
  install: Vue => Vue.use(VeeValidate, {
    dictionary: {
      en: {
        messages: {
          required: 'This field is required',
          min: (field, [length]) => `This field must be at least ${length} characters`,
          min_value: (field, [min]) => `This field must be ${min} or more`,
          min_value_exclusive: (field, [min]) => `This field must be more than ${min}`,
          max_value: (field, [max]) => `This field must be ${max} or less`,
          not_in: () => 'This field must be a valid value',
          decimal: (field, [decimals = '*'] = []) => `This field must be numeric and may contain ${!decimals || decimals === '*' ? '' : decimals} decimal points`,
          url_http: () => 'This field is not a valid HTTP(S) URL',
          confirmed: () => 'The passwords do not match',
          address: () => 'Invalid AE Address',
          mnemonic: () => 'Invalid recovery phrase',
        },
      },
    },
  }),
};
