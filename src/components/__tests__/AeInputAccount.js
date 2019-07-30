import Vue from 'vue';
import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import AeInputAccount from '../AeInputAccount.vue';

Object.assign(Vue.prototype, {
  $globals: {
    IS_MOBILE_DEVICE: true,
  },
  $t: () => 'locale-specific-text',
});

const localVue = createLocalVue();
localVue.use(Vuex);
const store = new Vuex.Store({
  getters: { 'names/get': () => () => '' },
});
const mountComponent = options => mount(AeInputAccount, { localVue, store, ...options });
const testAddress = 'ak_12345678912345678912345678912345678912345678912345';
const testAddressFormatted = 'ak_ 123 456 789 123 456 789 123 456 789 123 456 789 123 456 789 123 45';
const testAddress51 = 'ak_xXRgaNBuFudv8QHVX52BYmfFyBEZDSWrdMWt2PNk8Mo2ZgHQ';
const testAddress51Formatted = 'ak_ xXR gaN BuF udv 8QH VX5 2BY mfF yBE ZDS Wrd MWt 2PN k8M o2Z gHQ';

describe('AeInputAccount', () => {
  it('formats passed value', () => {
    const wrapper = mountComponent({ propsData: { value: testAddress } });
    expect(wrapper.find('textarea').element.value).toBe(testAddressFormatted);
  });

  it('formats passed value of 51 characters', () => {
    const wrapper = mountComponent({ propsData: { value: testAddress51 } });
    expect(wrapper.find('textarea').element.value).toBe(testAddress51Formatted);
  });

  it('adds prefix on input', (done) => {
    const inputListener = jest.fn();
    const wrapper = mountComponent({ listeners: { input: inputListener } });
    const textarea = wrapper.find('textarea');
    textarea.element.value = 'ak_beef';
    inputListener.mockImplementation((emittedValue) => {
      expect(emittedValue).toEqual('ak_beef');
      wrapper.setProps({ value: emittedValue });
      expect(textarea.element.value).toBe('ak_ bee f');
      done();
    });
    textarea.trigger('input');
  });

  it('removes non-base58 symbols', (done) => {
    const inputListener = jest.fn();
    const wrapper = mountComponent({ listeners: { input: inputListener } });
    const value = 'ak_019AHIJNOPZaklmz';
    const textarea = wrapper.find('textarea');
    textarea.element.value = value;
    textarea.element.setSelectionRange(value.length, value.length);
    inputListener.mockImplementation((emittedValue) => {
      expect(emittedValue).toEqual('ak_19AHJNPZakmz');
      wrapper.setProps({ value: emittedValue });
      expect(textarea.element.value).toBe('ak_ 19A HJN PZa kmz');
      done();
    });
    textarea.trigger('input');
  });

  it('emitted input event contains address without space symbols', (done) => {
    const inputListener = jest.fn((emittedValue) => {
      expect(emittedValue).toBe(testAddress);
      done();
    });
    const wrapper = mountComponent({
      propsData: { value: testAddress },
      listeners: { input: inputListener },
    });
    const textarea = wrapper.find('textarea');
    textarea.element.setSelectionRange(10, 10);
    textarea.trigger('input');
  });

  it('limits address length', (done) => {
    const inputListener = jest.fn();
    const wrapper = mountComponent({ listeners: { input: inputListener } });
    const begin = testAddressFormatted.slice(0, 25);
    const end = `${testAddressFormatted.slice(25)}test`;
    const textarea = wrapper.find('textarea');
    textarea.element.value = begin + end;
    textarea.element.setSelectionRange(begin.length, begin.length);
    inputListener.mockImplementation((emittedValue) => {
      expect(emittedValue).toEqual(testAddress);
      wrapper.setProps({ value: emittedValue });
      expect(textarea.element.value).toBe(testAddressFormatted);
      done();
    });
    textarea.trigger('input');
  });

  it('backspace can remove the whole value', async () => {
    const inputListener = jest.fn();
    const wrapper = mountComponent({
      propsData: { value: 'ak_12' },
      listeners: { input: inputListener },
    });

    const textarea = wrapper.find('textarea');
    while (textarea.element.value) {
      const { value } = textarea.element;
      textarea.element.value = value.slice(0, value.length - 1);
      textarea.element.setSelectionRange(value.length - 1, value.length - 1);
      textarea.trigger('input');
      // eslint-disable-next-line no-await-in-loop
      await new Promise(resolve => inputListener.mockImplementation(resolve));
      wrapper.setProps({ value: inputListener.mock.calls.pop()[0] });
      expect(textarea.element.value.length).toBeLessThan(value.length);
    }
  });
});
