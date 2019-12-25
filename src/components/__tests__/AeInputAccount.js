import Vue from 'vue';
import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import AeInputAccount from '../AeInputAccount.vue';
import { AENS_DOMAIN } from '../../lib/constants';

Object.assign(Vue.prototype, {
  $globals: {
    IS_MOBILE_DEVICE: true,
  },
  $t: () => 'locale-specific-text',
});

const localVue = createLocalVue();
localVue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    names: {
      namespaced: true,
      getters: {
        get: () => () => '',
        getAddress: () => () => '',
      },
    },
  },
});
const mountComponent = options => mount(AeInputAccount, { localVue, store, ...options });
const testAddress = 'ak_12345678912345678912345678912345678912345678912345';
const testAddressFormatted = 'ak_ 123 456 789 123 456 789 123 456 789 123 456 789 123 456 789 123 45';
const testAddress51 = 'ak_xXRgaNBuFudv8QHVX52BYmfFyBEZDSWrdMWt2PNk8Mo2ZgHQ';
const testAddress51Formatted = 'ak_ xXR gaN BuF udv 8QH VX5 2BY mfF yBE ZDS Wrd MWt 2PN k8M o2Z gHQ';
const testName = `test${AENS_DOMAIN}`;

describe('AeInputAccount', () => {
  [{
    name: 'formats passed value',
    value: testAddress,
    initialDisplayed: testAddressFormatted,
  }, {
    name: 'formats passed value of 51 characters',
    value: testAddress51,
    initialDisplayed: testAddress51Formatted,
  }, {
    name: 'adds domain suffix',
    value: 'aka',
    initialDisplayed: `aka${AENS_DOMAIN}`,
    input: {
      value: 'test',
      displayed: testName,
      emmited: testName,
    },
  }, {
    name: 'removes non-base58 symbols in addresses',
    input: {
      value: 'ak_019AHIJNOPZaklmzяя',
      displayed: 'ak_ 19A HJN PZa kmz',
      emmited: 'ak_19AHJNPZakmz',
    },
  }, {
    name: 'removes unknown symbols in names',
    input: {
      value: 'ka_019AHIJNOPZaklmzяя.ch',
      displayed: 'ka019AHIJNOPZaklmzch.chain',
      emmited: 'ka019AHIJNOPZaklmzch.chain',
    },
  }, {
    name: 'removes unknown symbols in names preserving AENS domain',
    input: {
      value: 'ka_019AHIJNOPZaklmzяя.chain',
      displayed: 'ka019AHIJNOPZaklmz.chain',
      emmited: 'ka019AHIJNOPZaklmz.chain',
    },
  }, {
    name: 'emits input event contains address without space symbols',
    input: {
      value: testAddress,
      cursor: 10,
      displayed: testAddressFormatted,
      emmited: testAddress,
    },
  }, {
    name: 'limits address length',
    input: {
      value: `${testAddressFormatted}test`,
      cursor: 25,
      displayed: testAddressFormatted,
      emmited: testAddress,
    },
  }, {
    name: 'can paste a name ending with domain without dot',
    input: {
      value: 'testchain',
      displayed: 'testchain.chain',
    },
  }, {
    name: 'can\'t break domain by removing char from the beginning of doamin',
    value: testName,
    input: {
      value: 'testchain',
      displayed: testName,
    },
  }, {
    name: 'can\'t break domain by removing char from the end',
    value: testName,
    input: {
      value: testName.slice(0, testName.length - 1),
      displayed: testName,
    },
  }, {
    name: 'can\'t break domain in the middle',
    value: testName,
    input: {
      value: 'test.choin',
      displayed: testName,
    },
  }, {
    name: 'can\'t break domain by adding chars to the end',
    value: testName,
    input: {
      value: `${testName}test`,
      displayed: testName,
    },
  }, {
    name: 'can\'t break domain by adding domain to the end',
    value: testName,
    input: {
      value: `${testName}${AENS_DOMAIN}`,
      displayed: testName,
    },
  }].forEach(test => it(test.name, () => {
    const inputListener = jest.fn();
    const wrapper = mountComponent({
      listeners: { input: inputListener },
      ...test.value && { propsData: { value: test.value } },
    });
    const textarea = wrapper.find('textarea');
    if (test.initialDisplayed) expect(textarea.element.value).toBe(test.initialDisplayed);
    if (test.input) {
      textarea.element.value = test.input.value;
      const cursor = test.cursor || test.input.value.length;
      textarea.element.setSelectionRange(cursor, cursor);
      textarea.trigger('input');
      expect(wrapper.find('textarea').element.value).toBe(test.input.displayed);
      if (test.input.emmited) expect(inputListener.mock.calls[0][0]).toEqual(test.input.emmited);
    }
  }));

  [
    { name: 'ak_12', backspace: true },
    { name: testName, backspace: true },
    { name: testName, backspace: false },
  ].forEach(({ name, backspace }) => it(
    `removes ${name} value with ${backspace ? 'backspace' : 'delete'} button`, () => {
      const inputListener = jest.fn();
      const wrapper = mountComponent({
        propsData: { value: name },
        listeners: { input: inputListener },
      });

      const textarea = wrapper.find('textarea');
      const cursor = backspace ? textarea.element.value.length : 0;
      textarea.element.setSelectionRange(cursor, cursor);
      let n = 0;
      while (textarea.element.value) {
        const { value } = textarea.element;
        if (backspace) {
          const c = textarea.element.selectionStart - 1;
          textarea.element.value = value.slice(0, c) + value.slice(c + 1);
          textarea.element.setSelectionRange(c, c);
        } else textarea.element.value = value.slice(1);
        textarea.trigger('input');
        wrapper.setProps({ value: inputListener.mock.calls.pop()[0] });
        expect(textarea.element.value.length).toBeLessThanOrEqual(value.length);
        expect(n += 1).toBeLessThan(15);
      }
    },
  ));
});
