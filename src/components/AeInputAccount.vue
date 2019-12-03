<template>
  <AeTextareaFormatted
    v-remove-spaces-on-copy
    :value="value"
    :placeholder="$t('transfer.send.to.address-or-name')"
    class="ae-input-address"
    rows="3"
    monospace
    submit-on-enter
    :format-display-value="formatDisplayValue"
    :format-emit-value="formatEmitValue"
    :get-new-cursor="getNewCursor"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <AeIdenticon
      v-if="!$attrs.footer && !$slots.footer && value"
      slot="footer"
      :address="address"
      size="s"
    />

    <template :slot="$globals.IS_MOBILE_DEVICE ? 'default-bottom-right' : 'footer-right'">
      <template v-if="!$globals.IS_MOBILE_DEVICE">
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

      <AeToolbarButton
        v-if="clipboardReadSupported"
        type="button"
        @click="readValueFromClipboard"
      >
        <Paste />
        {{ $globals.IS_MOBILE_DEVICE ? $t('transfer.send.to.paste') : '' }}
      </AeToolbarButton>
      <AeToolbarButton
        type="button"
        @click="readValueFromQrCode"
      >
        <Camera />
        {{ $globals.IS_MOBILE_DEVICE ? $t('transfer.send.to.scan') : '' }}
      </AeToolbarButton>
    </template>
  </AeTextareaFormatted>
</template>

<script>
import { mapState } from 'vuex';
import { Crypto } from '@aeternity/aepp-sdk/es';
import removeSpacesOnCopy from '../directives/removeSpacesOnCopy';
import AeTextareaFormatted from './AeTextareaFormatted.vue';
import AeIdenticon from './AeIdenticon.vue';
import AeToolbarButton from './AeToolbarButton.vue';
import { Card, Paste, Camera } from './icons';
import AePopover from './AePopover.vue';
import ListItemAccount from './ListItemAccount.vue';
import { AENS_DOMAIN } from '../lib/constants';

const ADDRESS_PREFIX = 'ak_';
const FORMATTED_ADDRESS_REGEXP = /^ak_[1-9A-HJ-NP-Za-km-z ]+$/;
const NOT_BASE58_CHARS = /[^1-9A-HJ-NP-Za-km-z]/g;

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
    clipboardReadSupported: process.env.IS_CORDOVA || navigator.clipboard,
  }),
  computed: mapState('names', {
    address(state, { getAddress }) {
      return getAddress(this.value);
    },
  }),
  subscriptions() {
    return !process.env.IS_MOBILE_DEVICE && {
      accounts: this.$store.state.observables.inactiveAccounts,
    };
  },
  methods: {
    formatAddress(address) {
      let res = address
        .slice(ADDRESS_PREFIX.length)
        .replace(NOT_BASE58_CHARS, '');

      if (!res) return ADDRESS_PREFIX;

      res = res
        .slice(0, 50)
        .match(/.{1,3}/g)
        .join(' ');

      return `${ADDRESS_PREFIX} ${res}`;
    },
    formatDisplayValue(value) {
      const name = Crypto.isAddressValid(value) && this.$store.getters['names/get'](value, false);
      if (name) return name;
      const domainIndex = value.indexOf(AENS_DOMAIN);
      if (value
        && !value.startsWith(ADDRESS_PREFIX)
        && !value.endsWith(AENS_DOMAIN)) {
        if (domainIndex > 0) {
          return value.slice(0, -(value.length - domainIndex - AENS_DOMAIN.length));
        }
        if (value.length > AENS_DOMAIN.length - 1) {
          return this.value;
        }
        return value + AENS_DOMAIN;
      }
      if (value === AENS_DOMAIN
        || (value.startsWith(ADDRESS_PREFIX) && value.endsWith(AENS_DOMAIN))
        || (domainIndex > 0 && domainIndex + AENS_DOMAIN.length !== value.length)) {
        return value.slice(0, -AENS_DOMAIN.length);
      }
      if (value.startsWith(ADDRESS_PREFIX)) return this.formatAddress(value);
      return value;
    },
    formatEmitValue(value) {
      if (FORMATTED_ADDRESS_REGEXP.test(value)) return value.replace(/ /g, '');
      return value;
    },
    getNewCursor(value, cursor) {
      if (this.formatDisplayValue(value).endsWith(AENS_DOMAIN)) return cursor;
      return this.formatDisplayValue(value.slice(0, cursor)).length;
    },
    setValue(newValue) {
      this.$children[0].$el.querySelector('textarea').value = newValue;
      this.$children[0].handleInput();
      this.showAccountsDropdown = false;
    },
    async readValueFromQrCode() {
      this.setValue(await this.$store.dispatch('modals/open', {
        name: 'readQrCode',
        title: this.$t('transfer.send.to.scan-address'),
      }));
    },
    async readValueFromClipboard() {
      this.setValue(await (process.env.IS_CORDOVA
        ? new Promise((...args) => window.cordova.plugins.clipboard.paste(...args))
        : navigator.clipboard.readText()));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/functions';

.ae-input-address .ae-identicon {
  height: rem(20px);
  vertical-align: -.4em;
}
</style>
