import Vue from 'vue';
import { Validator, install as VeeValidate } from 'vee-validate/dist/vee-validate.minimal.esm';
import {
  confirmed, decimal, excluded, min, required,
} from 'vee-validate/dist/rules.esm';
import BigNumber from 'bignumber.js';
import { throttle } from 'lodash-es';
import { Crypto } from '@aeternity/aepp-sdk/es';
import { validateMnemonic } from '@aeternity/bip39';
import { i18n } from './languages';
import { toUrl } from '../../../lib/utils';
import { getPublicKeyByResponseUrl } from '../../../lib/airGap';

Vue.use(VeeValidate);

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
Validator.extend('air_gap_response_url', (value) => {
  try {
    getPublicKeyByResponseUrl(value);
    return true;
  } catch (e) {
    return false;
  }
});
Validator.extend('aens_name', value => value.endsWith('.test'));

Validator.localize('en', {
  messages: {
    confirmed: () => i18n.t('validation.confirmed'),
    decimal: (field, [decimals = '*'] = []) => i18n.t(
      'validation.decimal', [!decimals || decimals === '*' ? '' : decimals],
    ),
    excluded: () => i18n.t('validation.excluded'),
    min: (field, [length]) => i18n.t('validation.min', [length]),
    required: () => i18n.t('validation.required'),

    address: () => i18n.t('validation.address'),
    max_value: (field, [arg]) => i18n.t('validation.max_value', [arg]),
    min_value: (field, [arg]) => i18n.t('validation.min_value', [arg]),
    min_value_exclusive: (field, [arg]) => i18n.t('validation.min_value_exclusive', [arg]),
    mnemonic: () => i18n.t('validation.mnemonic'),
    url_http: () => i18n.t('validation.url_http'),
    air_gap_response_url: () => i18n.t('validation.air_gap_response_url'),
    aens_name: () => i18n.t('validation.aens_name'),
    aens_name_unregistered: () => i18n.t('validation.aens_name_unregistered'),
  },
});

export default (store) => {
  Validator.extend(
    'aens_name_unregistered',
    throttle(
      value => store.state.sdk.aensQuery(value).then(() => false, () => true),
      300,
    ),
  );
};
