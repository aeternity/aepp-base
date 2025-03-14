<template>
  <AeTextareaFormatted
    v-remove-spaces-on-copy
    :value="value"
    :placeholder="$t('transfer.send.to.address-or-name')"
    class="ae-input-address"
    rows="3"
    monospace
    submit-on-enter
    v-bind="$attrs"
    v-on="$listeners"
  >
    <AeIdenticon
      v-if="!$attrs.footer && !$slots.footer && value"
      slot="footer"
      :address="address"
      size="s"
    />

    <template :slot="$globals.ENV_MOBILE_DEVICE ? 'default-bottom-right' : 'footer-right'">
      <template v-if="!$globals.ENV_MOBILE_DEVICE">
        <AeToolbarButton
          v-if="accounts.length"
          ref="accounts-button"
          type="button"
          @click="showAccountsDropdown = true"
        >
          <Card />
        </AeToolbarButton>

        <AePopover
          :anchor="showAccountsDropdown ? $refs['accounts-button'] : null"
          :anchor-origin="{ vertical: 'bottom', horizontal: 'right' }"
          :transform-origin="{ vertical: 'top', horizontal: 'right' }"
          @close="showAccountsDropdown = false"
        >
          <ListItemAccount
            v-for="account in accounts"
            :key="account.address"
            v-bind="account"
            @click="setValue(account.address)"
          />
        </AePopover>
      </template>

      <AeToolbarButton v-if="clipboardReadSupported" type="button" @click="readValueFromClipboard">
        <Paste />
        {{ $globals.ENV_MOBILE_DEVICE ? $t('transfer.send.to.paste') : '' }}
      </AeToolbarButton>
      <AeToolbarButton type="button" @click="readValueFromQrCode">
        <Camera />
        {{ $globals.ENV_MOBILE_DEVICE ? $t('transfer.send.to.scan') : '' }}
      </AeToolbarButton>
    </template>
  </AeTextareaFormatted>
</template>

<script>
import { mapState } from 'vuex';
import { isAddressValid } from '@aeternity/aepp-sdk';
import { AENS_DOMAIN } from '../lib/constants';
import withFormatting from '../lib/withFormatting';
import removeSpacesOnCopy from '../directives/removeSpacesOnCopy';
import { formatDisplayValueAndCursor } from './AeInputName';
import AeTextarea from './AeTextarea.vue';
import AeIdenticon from './AeIdenticon.vue';
import AeToolbarButton from './AeToolbarButton.vue';
import { Card, Paste, Camera } from './icons';
import AePopover from './AePopover.vue';
import ListItemAccount from './ListItemAccount.vue';

const ADDRESS_PREFIX = 'ak_';
const FORMATTED_ADDRESS_REGEXP = /^ak_[1-9A-HJ-NP-Za-km-z ]+$/;
const NOT_BASE58_CHARS = /[^1-9A-HJ-NP-Za-km-z]/g;
const formatAddress = (address) => {
  let res = address.slice(ADDRESS_PREFIX.length).replace(NOT_BASE58_CHARS, '');

  if (!res) return ADDRESS_PREFIX;

  res = res
    .slice(0, 50)
    .match(/.{1,3}/g)
    .join(' ');

  return `${ADDRESS_PREFIX} ${res}`;
};
const AeTextareaFormatted = withFormatting(AeTextarea, {
  formatDisplayValueAndCursor({ value, cursor }, previousValue) {
    if (ADDRESS_PREFIX.startsWith(value)) return { value, cursor };
    const name = isAddressValid(value) && this.$store.getters['names/get'](value, false);
    if (name) return { value: name, cursor: 0 };
    if (value.startsWith(ADDRESS_PREFIX)) {
      const withoutChain = value.replace(new RegExp(`\\${AENS_DOMAIN}$`), '');
      return {
        value: formatAddress(withoutChain),
        cursor: formatAddress(withoutChain.slice(0, cursor)).length,
      };
    }
    return formatDisplayValueAndCursor({ value, cursor }, previousValue);
  },
  formatEmitValue(value) {
    if (FORMATTED_ADDRESS_REGEXP.test(value)) return value.replace(/ /g, '');
    return value;
  },
});

export default {
  directives: {
    removeSpacesOnCopy,
  },
  components: {
    AeIdenticon,
    AeTextareaFormatted,
    AeToolbarButton,
    Card,
    Paste,
    Camera,
    AePopover,
    ListItemAccount,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    showAccountsDropdown: false,
    clipboardReadSupported: process.env.VUE_APP_CORDOVA || navigator.clipboard,
  }),
  computed: mapState('names', {
    address(state, { getAddress }) {
      return getAddress(this.value);
    },
  }),
  subscriptions() {
    return (
      !ENV_MOBILE_DEVICE && {
        accounts: this.$store.state.observables.inactiveAccounts,
      }
    );
  },
  methods: {
    setValue(newValue) {
      const node = this.$el.querySelector('textarea');
      node.value = newValue;
      const event = new Event('input');
      Object.defineProperty(event, 'target', { value: node });
      node.dispatchEvent(event);
      this.showAccountsDropdown = false;
    },
    async readValueFromQrCode() {
      this.setValue(
        await this.$store.dispatch('modals/open', {
          name: 'readQrCode',
          title: this.$t('transfer.send.to.scan-address'),
        }),
      );
    },
    async readValueFromClipboard() {
      this.setValue(
        await (process.env.VUE_APP_CORDOVA
          ? new Promise((...args) => {
              window.cordova.plugins.clipboard.paste(...args);
            })
          : navigator.clipboard.readText()),
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../styles/functions';

.ae-input-address .ae-identicon {
  height: functions.rem(20px);
  vertical-align: -0.4em;
}
</style>
