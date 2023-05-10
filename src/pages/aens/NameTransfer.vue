<template>
  <Page
    :right-button-to="{ name: 'name-details', params: { name } }"
    right-button-icon-name="close"
    :header-fill="activeColor"
    class="name-transfer"
    hide-tab-bar
  >
    <template slot="header">
      <Guide
        :template="pointing ? $t('name.point.guide') : $t('name.transfer.guide')"
        fill="neutral"
      >
        <AccountInline
          slot="account"
          :address="activeAccount.address"
        />
      </Guide>

      <form
        :id="_uid"
        @submit.prevent="transfer"
      >
        <AeInputAccount
          v-model="accountTo"
          v-validate="'required|account'"
          autofocus
          :error="errors.has('accountTo')"
          :footer="errors.first('accountTo')"
          name="accountTo"
          :header="$t('transfer.send.to.recipient')"
        />
      </form>
    </template>

    <AeButton
      :disabled="busy || errors.any()"
      :spinner="busy"
      :form="_uid"
      fill="secondary"
    >
      {{ $t('next') }}
    </AeButton>

    <template v-if="!busy && accountsToChoose.length">
      <div class="own-account">
        {{ pointing ? $t('name.point.subaccount') : $t('name.transfer.subaccount') }}
      </div>
      <ListItemAccount
        v-for="account in accountsToChoose"
        :key="account.address"
        border-dark
        v-bind="account"
        @click="transferToAccount(account.address)"
      >
        <LeftMore slot="right" />
      </ListItemAccount>
    </template>
  </Page>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { handleUnknownError, getAddressByNameEntry } from '../../lib/utils';
import Page from '../../components/Page.vue';
import Guide from '../../components/Guide.vue';
import AccountInline from '../../components/AccountInline.vue';
import AeInputAccount from '../../components/AeInputAccount.vue';
import AeButton from '../../components/AeButton.vue';
import ListItemAccount from '../../components/ListItemAccount.vue';
import { LeftMore } from '../../components/icons';

export default {
  components: {
    Page,
    Guide,
    AccountInline,
    AeInputAccount,
    AeButton,
    ListItemAccount,
    LeftMore,
  },
  props: {
    pointing: Boolean,
    name: { type: String, required: true },
  },
  data: () => ({ accountTo: '', busy: false }),
  computed: {
    ...mapState('names', {
      nameEntry({ owned }) {
        return owned && owned.names.find(({ name }) => name === this.name);
      },
    }),
    ...mapGetters('accounts', { activeAccount: 'active', activeColor: 'activeColor' }),
    currentAccountAddress() {
      return this.pointing ? getAddressByNameEntry(this.nameEntry) : this.activeAccount.address;
    },
  },
  subscriptions() {
    return {
      accountsToChoose: this.$store.state.observables.getAccounts(
        ({ accounts: { list } }) => list
          .filter(({ address }) => address !== this.currentAccountAddress),
      ),
    };
  },
  mounted() {
    const initialAccountIdx = this.$store.state.accounts.activeIdx;
    const requredAccountIdx = this.$store.state.accounts.list
      .findIndex(({ address }) => address === this.nameEntry.info.ownership.current);
    if (initialAccountIdx !== requredAccountIdx) {
      this.$store.commit('accounts/setActiveIdx', requredAccountIdx);
      this.$once('hook:destroyed', () => this.$store
        .commit('accounts/setActiveIdx', initialAccountIdx));
    }
  },
  methods: {
    transferToAccount(address) {
      this.accountTo = address;
      this.transfer();
    },
    async transfer() {
      if (!await this.$validator.validateAll()) return;
      if (this.currentAccountAddress === this.accountTo) {
        await this.$store.dispatch('modals/open', {
          name: 'confirm',
          text: this.pointing
            ? this.$t('name.point.confirm-pointing-to-same-account')
            : this.$t('name.transfer.confirm-transfering-to-same-account'),
        });
      }
      this.busy = true;
      try {
        await (this.pointing
          ? this.$store.dispatch('names/updatePointer', { name: this.name, address: this.accountTo })
          : this.$store.state.sdk.aensTransfer(this.nameEntry.name, this.accountTo));
        this.$store.dispatch('modals/open', {
          name: 'notification',
          text: this.pointing
            ? this.$t('name.point.notification.succeed', { name: this.name })
            : this.$t('name.transfer.notification.succeed', { name: this.name }),
        });
        this.$router.push({ name: 'name-details', params: { name: this.name } });
      } catch (e) {
        if (e.message === 'Rejected by user') return;
        this.$store.dispatch('modals/open', {
          name: 'notification',
          text: this.pointing
            ? this.$t('name.point.notification.failed', { name: this.name })
            : this.$t('name.transfer.notification.failed', { name: this.name }),
        });
        handleUnknownError(e);
      } finally {
        this.busy = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../../styles/variables';
@use '../../styles/functions';
@use '../../styles/typography';

.name-transfer .own-account {
  margin-top: functions.rem(20px);
  padding-bottom: functions.rem(20px);
  border-bottom: functions.rem(2px) solid variables.$color-neutral-positive-1;
  @extend %face-sans-s;
  font-weight: 500;
  color: variables.$color-neutral-negative-1;
}
</style>
