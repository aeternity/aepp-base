import { mount } from '@vue/test-utils';
import AeAddress from '../AeAddress.vue';

describe('AeAddress', () => {
  [{
    address: 'ak_123456789123456789123456789123456789123456789123',
    lines: ['ak_ 123 456 789 123 456 789 123 456 789 123 456 789 123 456 789 123'],
  }, {
    address: 'ak_1234567891234567891234567891234567891234567891234',
    lines: ['ak_ 123 456 789 123 456 789 123 456 789 123 456 789 123 456 789 123 4'],
  }, {
    address: 'ak_12345678912345678912345678912345678912345678912345',
    lines: ['ak_ 123 456 789 123 456 789 123 456 789 123 456 789 123 456 789 123 45'],
  }].forEach(({ address, lines }) => it(
    `formats address with length ${address.length}`,
    () => {
      const wrapper = mount(AeAddress, { propsData: { address } });
      expect(wrapper.vm.lines).toEqual(lines);
    },
  ));
});
