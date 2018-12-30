import BigNumber from 'bignumber.js';
import prefixedAmount from '../prefixedAmount';
import { MAGNITUDE } from '../../lib/constants';

describe('prefixedAmount', () => {
  it('removes trailing zeros', () => {
    expect(prefixedAmount(BigNumber('1.0000'))).toBe('1');
  });

  it('displays fees', () => {
    expect(prefixedAmount(BigNumber(17120).shiftedBy(-MAGNITUDE), 0)).toBe('0.01712 Pico');
  });

  it('displays balance', () => {
    expect(prefixedAmount(BigNumber('89.99999999000924699'))).toBe('90');
  });

  it('generates proper values', () => {
    const t = BigNumber(`0.${'123456789'.repeat(3)}`).shiftedBy(-MAGNITUDE);
    [
      '0.00000012 Pico',
      '0.00000123 Pico',
      '0.00001235 Pico',
      '0.00012346 Pico',
      '0.00123457 Pico',
      '0.01234568 Pico',
      '0.12345679 Pico',
      '1.23456789 Pico',
      '12.3456789 Pico',
      '123.456789 Pico',
      '1234.56789 Pico',
      '12345.6789 Pico',
      '123456.789 Pico',
      '0.00000123',
      '0.00001235',
      '0.00012346',
      '0.00123457',
      '0.01234568',
      '0.12345679',
      '1.23456789',
      '12.3456789',
      '123.456789',
      '1234.56789',
      '12345.6789',
      '123456.789',
      '1234567.89',
      '12345678.9',
      '123456789',
      '1.23456789 Giga',
      '12.3456789 Giga',
      '123.456789 Giga',
      '1234.56789 Giga',
      '12345.6789 Giga',
      '123456.789 Giga',
      '1234567.89 Giga',
      '12345678.9 Giga',
      '123456789 Giga',
      '1.23456789 Exa',
      '12.3456789 Exa',
    ].forEach((res, idx) => expect(prefixedAmount(t.shiftedBy(idx))).toBe(res));
  });
});
