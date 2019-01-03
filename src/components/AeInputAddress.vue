<template>
  <ae-textarea-formatted
    v-remove-spaces-on-copy
    :value="value"
    placeholder="ak_ …"
    class="ae-input-address"
    rows="3"
    monospace
    :format-display-value="formatDisplayAddress"
    :format-emit-value="formatEmitAddress"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <ae-identicon
      v-if="!$attrs.footer && !$slots.footer && value"
      slot="footer"
      :address="value"
      size="s"
    />

    <template slot="footer-right">
      <template v-if="!$globals.IS_MOBILE_DEVICE">
        <ae-toolbar-button
          v-if="accounts.length"
          ref="accounts-button"
          type="button"
          @click="showAccountsDropdown = true"
        >
          <ae-icon name="card" />
        </ae-toolbar-button>

        <ae-popover
          :anchor="showAccountsDropdown ? $refs['accounts-button'] : null"
          @close="showAccountsDropdown = false"
        >
          <list-item-account
            v-for="account in accounts"
            :key="account.address"
            v-bind="account"
            @click="setAddress(account.address)"
          />
        </ae-popover>
      </template>

      <ae-toolbar-button
        type="button"
        @click="readValueFromQrCode"
      >
        <ae-icon name="camera" />
        {{ $globals.IS_MOBILE_DEVICE ? 'Scan' : '' }}
      </ae-toolbar-button>
    </template>
  </ae-textarea-formatted>
</template>

<script>
import { mapState } from 'vuex';
import { AeIdenticon, AeIcon, directives } from '@aeternity/aepp-components-3';
import AeTextareaFormatted from './AeTextareaFormatted.vue';
import AeToolbarButton from './AeToolbarButton.vue';
import AePopover from './AePopover.vue';
import ListItemAccount from './ListItemAccount.vue';

export default {
  directives: {
    removeSpacesOnCopy: directives.removeSpacesOnCopy,
  },
  components: {
    AeIdenticon, AeIcon, AeTextareaFormatted, AeToolbarButton, AePopover, ListItemAccount,
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
  computed: {
    ...mapState({
      accounts: (state, { identities, activeIdentity }) => identities
        .filter(i => i !== activeIdentity),
    }),
  },
  watch: {
    showAccountsDropdown(value) {
      if (!value) return;
      this.$store.dispatch('updateAllBalances');
    },
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
    },
    async readValueFromQrCode() {
      this.setAddress(await this.$store.dispatch('readQrCode', 'Scan AE Address'));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.ae-input-address {
  .ae-identicon {
    vertical-align: -.55em;
  }
}
</style>
