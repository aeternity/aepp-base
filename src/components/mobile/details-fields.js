import { decode, Encoding } from '@aeternity/aepp-sdk-next';
import { i18n } from '../../store/plugins/ui/languages';
import DetailsRawData from './DetailsRawData.vue';
import DetailsAddress from './DetailsAddress.vue';
import DetailsField from './DetailsField.vue';
import DetailsAmountCurrency from './DetailsAmountCurrency.vue';

const genDetailsWrapper = (Component, valueFieldName) => (name, otherProps) => ({
  functional: true,
  render(createElement, { props: { value } }) {
    return createElement(Component, {
      attrs: {
        ...otherProps,
        name: typeof name === 'function' ? name() : name,
        [valueFieldName]: value,
      },
    });
  },
});

export const genDetailsRawData = genDetailsWrapper(DetailsRawData, 'data');
export const genDetailsAddress = genDetailsWrapper(DetailsAddress, 'address');
export const genDetailsField = genDetailsWrapper(DetailsField, 'value');
export const genDetailsAmountCurrency = genDetailsWrapper(DetailsAmountCurrency, 'amount');

export const Payload = {
  functional: true,
  render: (createElement, { props: { value } }) => {
    const data = decode(value, Encoding.Bytearray).toString();
    return data
      ? createElement(DetailsRawData, {
        attrs: { name: i18n.t('modal.confirm-transaction-sign.payload'), data },
      })
      : null;
  },
};

export const RecipientId = genDetailsAddress(() => i18n.t('modal.confirm-transaction-sign.recipient-account'));
export const Code = genDetailsRawData(() => i18n.t('modal.confirm-transaction-sign.contract-compiled-code'));
export const CallData = genDetailsRawData(() => i18n.t('modal.confirm-transaction-sign.call-data'));
export const ContractId = genDetailsAddress(() => i18n.t('modal.confirm-transaction-sign.contract-address'));
export const CommitmentId = genDetailsRawData(() => i18n.t('modal.confirm-transaction-sign.commitment'));
export const Name = genDetailsField(() => i18n.t('name.details.name'));

export const NameSalt = genDetailsField(() => i18n.t('modal.confirm-transaction-sign.name-salt'));
export const NameId = genDetailsRawData(() => i18n.t('modal.confirm-transaction-sign.name-id'));
export const NameFee = genDetailsAmountCurrency(() => i18n.t('modal.confirm-transaction-sign.name-fee'));
export const OwnerId = genDetailsAddress(() => i18n.t('name.details.owner'));
export const CreatedAtHeight = genDetailsField(() => i18n.t('name.details.created-at-height'));
export const ExpiresAtHeight = genDetailsField(() => i18n.t('name.details.expires-at-height'));
