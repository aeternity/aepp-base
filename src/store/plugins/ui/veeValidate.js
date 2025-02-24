import Vue from 'vue';
import { Validator, install as VeeValidate } from 'vee-validate/dist/vee-validate.minimal.esm';
import {
  confirmed, decimal, excluded, min, required,
} from 'vee-validate/dist/rules.esm';
import BigNumber from 'bignumber.js';
import { debounce } from 'lodash-es';
import { isAddressValid } from '@aeternity/aepp-sdk';
import { validateMnemonic } from '@aeternity/bip39';
import { i18n } from './languages';
import {
  toUrl, isAensName, ConvertibleToString, getAddressByNameEntry, isNotFoundError,
} from '../../../lib/utils';
import { getPublicKeyByResponseUrl } from '../../../lib/airGap';

Vue.use(VeeValidate);

Validator.extend('confirmed', confirmed);
Validator.extend('decimal', decimal);
Validator.extend('excluded', excluded);
Validator.extend('min', min);
Validator.extend('required', required);

Validator.extend('address', (value) => isAddressValid(value));
Validator.extend('max_value', (value, [arg]) => BigNumber(value).isLessThanOrEqualTo(arg));
Validator.extend('max_value_currency', (value, [arg]) => BigNumber(value).isLessThanOrEqualTo(arg));
Validator.extend('min_value', (value, [arg]) => BigNumber(value).isGreaterThanOrEqualTo(arg));
Validator.extend('min_value_currency', (value, [arg]) => BigNumber(value).isGreaterThanOrEqualTo(arg));
Validator.extend('min_value_exclusive', (value, [arg]) => BigNumber(value).isGreaterThan(arg));
Validator.extend('mnemonic', (value) => validateMnemonic(value));
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
Validator.extend('aens_name', isAensName);

Validator.localize('en', {
  messages: {
    confirmed: () => i18n.t('validation.confirmed'),
    decimal: (field, [decimals = '*'] = []) => i18n.t('validation.decimal', [!decimals || decimals === '*' ? '' : decimals]),
    excluded: () => i18n.t('validation.excluded'),
    min: (field, [length]) => i18n.t('validation.min', [length]),
    required: () => i18n.t('validation.required'),

    address: () => i18n.t('validation.address'),
    account: () => i18n.t('validation.account'),
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
  const NAME_STATES = {
    REGISTERED: Symbol('name state: registered'),
    REGISTERED_ADDRESS: Symbol('name state: registered and points to address'),
    UNREGISTERED: Symbol('name state: unregistered'),
  };

  let lastPromiseCallback;
  const checkNameDebounced = debounce(
    async (name, expectedNameState) => {
      try {
        const nameEntry = await store.getters.node.getNameEntryByName(name);
        lastPromiseCallback.resolve(({
          [NAME_STATES.REGISTERED]: true,
          [NAME_STATES.REGISTERED_ADDRESS]: !!getAddressByNameEntry(nameEntry),
          [NAME_STATES.UNREGISTERED]: false,
        }[expectedNameState]));
      } catch (error) {
        if (!isNotFoundError(error)) lastPromiseCallback.reject(error);
        else lastPromiseCallback.resolve(expectedNameState === NAME_STATES.UNREGISTERED);
      }
      lastPromiseCallback = null;
    },
    300,
  );
  const checkName = (expectedNameState) => (name) => new Promise((resolve, reject) => {
    if (lastPromiseCallback) lastPromiseCallback.resolve(false);
    lastPromiseCallback = { resolve, reject };
    checkNameDebounced(name, expectedNameState);
  });
  const checkNameRegisteredAddress = checkName(NAME_STATES.REGISTERED_ADDRESS);

  Validator.extend('aens_name_unregistered', checkName(NAME_STATES.UNREGISTERED));
  Validator.extend('account', (value) => isAddressValid(value) || (isAensName(value) && checkNameRegisteredAddress(value)));

  const genMaxMinValueCurrencyMessageGenerator = (isMax) => (field, [amountAe]) => (
    new ConvertibleToString(() => {
      let amount = +amountAe;
      if (store.state.currencies.swapped) {
        store.state.observables.rate
          .subscribe((rate) => { amount *= rate; })
          .unsubscribe();
      }
      const approximateAmount = +amount.toPrecision(5);
      const stringAmount = `${approximateAmount === amount ? '' : '~'}${approximateAmount}`;
      return isMax
        ? i18n.t('validation.max_value', [stringAmount])
        : i18n.t('validation.min_value', [stringAmount]);
    }));

  Validator.localize('en', {
    messages: {
      max_value_currency: genMaxMinValueCurrencyMessageGenerator(true),
      min_value_currency: genMaxMinValueCurrencyMessageGenerator(false),
    },
  });
};
