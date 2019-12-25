import withFormatting from '../lib/withFormatting';
import { AENS_DOMAIN } from '../lib/constants';
import AeInput from './AeInput.vue';

const nameRegExp = new RegExp(`^[a-zA-Z0-9]+\\${AENS_DOMAIN}$`);
const notNameCharsRegExp = /[^a-zA-Z0-9]/g;

export const formatDisplayValueAndCursor = ({ value, cursor }, previousValue) => {
  if (!value || value === AENS_DOMAIN) return { value: '', cursor: 0 };
  if (nameRegExp.test(value)) return { value, cursor };
  if (!previousValue) {
    return {
      value: value
        .replace(new RegExp(`\\${AENS_DOMAIN}$`), '')
        .replace(notNameCharsRegExp, '') + AENS_DOMAIN,
      cursor,
    };
  }
  if (nameRegExp.test(value + AENS_DOMAIN) && !value.endsWith(AENS_DOMAIN.slice(1))) {
    return { value: value + AENS_DOMAIN, cursor };
  }
  return {
    value: previousValue,
    cursor: Math.min(cursor, previousValue.length - AENS_DOMAIN.length),
  };
};

export default withFormatting(AeInput, { formatDisplayValueAndCursor });
