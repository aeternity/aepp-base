<template>
  <AeTextareaFormatted
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
          <AeIcon name="card" />
        </AeToolbarButton>

        <AePopover
          :anchor="showAccountsDropdown ? $refs['accounts-button'] : null"
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
        <AeIcon name="camera" />
        {{ $globals.IS_MOBILE_DEVICE ? 'Scan' : '' }}
      </AeToolbarButton>
    </template>
  </AeTextareaFormatted>
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
      this.showAccountsDropdown = false;
    },
    async readValueFromQrCode() {
      this.setAddress(await this.$store.dispatch('modals/readQrCode', { title: 'Scan AE Address' }));
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
