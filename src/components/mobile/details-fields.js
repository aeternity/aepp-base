import { Crypto } from '@aeternity/aepp-sdk/es';
import { removeTopDomain } from '../../lib/utils';
import { i18n } from '../../store/plugins/ui/languages';
import DetailsRawData from './DetailsRawData.vue';
import DetailsAddress from './DetailsAddress.vue';
import DetailsField from './DetailsField.vue';

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

export const Payload = {
  functional: true,
  render: (createElement, { props: { value } }) => {
    const data = Crypto.decodeBase64Check(Crypto.assertedType(value, 'ba')).toString();
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

export const NameEncoded = {
  functional: true,
  render: (createElement, { props: { value } }) => createElement(DetailsField, {
    attrs: {
      name: i18n.t('name.details.name'),
      value: removeTopDomain(Crypto.decodeBase58Check(Crypto.assertedType(value, 'nm')).toString()),
    },
  }),
};

export const NameSalt = genDetailsField(() => i18n.t('modal.confirm-transaction-sign.name-salt'));
export const NameId = genDetailsRawData(() => i18n.t('modal.confirm-transaction-sign.name-id'));
export const OwnerId = genDetailsAddress(() => i18n.t('name.details.owner'));
export const CreatedAtHeight = genDetailsField(() => i18n.t('name.details.created-at-height'));
export const ExpiresAtHeight = genDetailsField(() => i18n.t('name.details.expires-at-height'));
