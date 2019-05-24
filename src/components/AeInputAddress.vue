<template>
  <AeTextareaFormatted
    v-remove-spaces-on-copy
    :value="value"
    placeholder="ak_ …"
    class="ae-input-address"
    rows="3"
    monospace
    submit-on-enter
    :format-display-value="formatDisplayAddress"
    :format-emit-value="formatEmitAddress"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <AeIdenticon
      v-if="!$attrs.footer && !$slots.footer && value"
      slot="footer"
      :address="value"
      size="s"
    />

    <template slot="footer-right">
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
            @click="setAddress(account.address)"
          />
        </AePopover>
      </template>

      <AeToolbarButton
        type="button"
        @click="readValueFromQrCode"
      >
        <Camera />
        {{ $globals.IS_MOBILE_DEVICE ? 'Scan' : '' }}
      </AeToolbarButton>
    </template>
  </AeTextareaFormatted>
</template>

<script>
import removeSpacesOnCopy from '../directives/removeSpacesOnCopy';
import AeTextareaFormatted from './AeTextareaFormatted.vue';
import AeIdenticon from './AeIdenticon.vue';
import AeToolbarButton from './AeToolbarButton.vue';
import { Card, Camera } from './icons';
import AePopover from './AePopover.vue';
import ListItemAccount from './ListItemAccount.vue';

export default {
  directives: {
    removeSpacesOnCopy,
  },
  components: {
    AeIdenticon, AeTextareaFormatted, AeToolbarButton, Card, Camera, AePopover, ListItemAccount,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    showAccountsDropdown: false,
  }),
  subscriptions() {
    return !process.env.IS_MOBILE_DEVICE && {
      accounts: this.$store.state.observables.inactiveAccounts,
    };
  },
  methods: {
    formatDisplayAddress(address) {
      if (['', 'a', 'ak'].includes(address)) return address;

      let res = address
        .slice(address.startsWith('ak_') ? 3 : 0)
        .replace(/[^1-9A-HJ-NP-Za-km-z]/g, '');

      if (!res) return 'ak_';

      res = res
        .slice(0, 50)
        .match(/^.{2}(?!.{46}$)|.{1,3}/g)
        .join(' ');

      return `ak_ ${res}`;
    },
    formatEmitAddress(address) {
      return address.replace(/ /g, '');
    },
    setAddress(newAddress) {
      this.$children[0].$el.querySelector('textarea').value = newAddress;
      this.$children[0].handleInput();
      this.showAccountsDropdown = false;
    },
    async readValueFromQrCode() {
      this.setAddress(await this.$store.dispatch('modals/open', { name: 'readQrCode', title: 'Scan AE Address' }));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';

.ae-input-address .ae-identicon {
  height: rem(20px);
  vertical-align: -.4em;
}
</style>
