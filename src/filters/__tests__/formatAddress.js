import formatAddress from '../formatAddress';

describe('formatAddress', () => {
  const testAddress = 'ak_123456789123456789123456789123456789123456789123';
  const testAddressFormatted =
    'ak_ 123 456 789 123 456 789 123 456 789 123 456 789 123 456 789 123';

  [
    {
      address: testAddress,
      formatted: testAddressFormatted,
    },
    {
      address: `${testAddress}4`,
      formatted: `${testAddressFormatted} 4`,
    },
    {
      address: `${testAddress}45`,
      formatted: `${testAddressFormatted} 45`,
    },
  ].forEach(({ address, formatted }) =>
    it(`formats address with length ${address.length}`, () =>
      expect(formatAddress(address)).toEqual(formatted)),
  );

  it('formats address in short mode', () =>
    expect(formatAddress(testAddress, 'short')).toEqual('ak_ 123···123'));
});
