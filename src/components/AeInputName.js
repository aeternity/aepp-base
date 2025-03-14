import { isNameValid } from '@aeternity/aepp-sdk';
import withFormatting from '../lib/withFormatting';
import { AENS_DOMAIN } from '../lib/constants';
import AeInput from './AeInput.vue';

const notNameCharsRegExp = /[^\p{General_Category=Letter}0-9-]/gu;

export const formatDisplayValueAndCursor = ({ value, cursor }, previousValue) => {
  if (!value || value === AENS_DOMAIN) return { value: '', cursor: 0 };
  if (isNameValid(value)) return { value, cursor };
  if (!previousValue) {
    const cleared = value
      .replace(new RegExp(`\\${AENS_DOMAIN}$`), '')
      .replace(notNameCharsRegExp, '');
    return {
      value: cleared && cleared + AENS_DOMAIN,
      cursor,
    };
  }
  if (isNameValid(value + AENS_DOMAIN) && !value.endsWith(AENS_DOMAIN.slice(1))) {
    return { value: value + AENS_DOMAIN, cursor };
  }
  return {
    value: previousValue,
    cursor: Math.min(cursor, previousValue.length - AENS_DOMAIN.length),
  };
};

export default withFormatting(AeInput, { formatDisplayValueAndCursor });
