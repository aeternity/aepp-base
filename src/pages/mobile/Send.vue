<template>
  <Page
    :right-button-to="{ name: 'transfer' }"
    right-button-icon-name="close"
    :header-fill="activeColor"
    class="send"
  >
    <template slot="header">
      <Guide
        :template="$t('transfer.send.to.guide')"
        fill="neutral"
      >
        <AeFraction
          slot="icon"
          numerator="1"
          denominator="3"
        />
        <AccountInline
          slot="account"
          :address="activeAccount.address"
        />
      </Guide>

      <form
        :id="_uid"
        @submit.prevent="setAddress"
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
      :disabled="errors.any()"
      :form="_uid"
      fill="secondary"
    >
      {{ $t('next') }}
    </AeButton>

    <div
      v-if="inactiveAccounts.length"
      class="own-account"
    >
      {{ $t('transfer.send.to.subaccount') }}
    </div>
    <ListItemAccount
      v-for="account in inactiveAccounts"
      :key="account.address"
      :to="{
        name: 'send-to',
        params: { to: account.address },
      }"
      border-dark
      v-bind="account"
    >
      <LeftMore slot="right" />
    </ListItemAccount>
  </Page>
</template>

<script>
import { pick } from 'lodash-es';
import { mapGetters, mapState } from 'vuex';
import Page from '../../components/Page.vue';
import Guide from '../../components/Guide.vue';
import AeFraction from '../../components/AeFraction.vue';
import AccountInline from '../../components/AccountInline.vue';
import AeInputAccount from '../../components/AeInputAccount.vue';
import AeButton from '../../components/AeButton.vue';
import ListItemAccount from '../../components/ListItemAccount.vue';
import { LeftMore } from '../../components/icons';

export default {
  components: {
    Page,
    Guide,
    AeFraction,
    AccountInline,
    AeInputAccount,
    AeButton,
    ListItemAccount,
    LeftMore,
  },
  data: () => ({
    accountTo: '',
  }),
  computed: {
    ...mapGetters('accounts', { activeAccount: 'active', activeColor: 'activeColor' }),
    ...mapState('names', {
      accountToAddress(state, { getAddress }) {
        return getAddress(this.accountTo);
      },
    }),
  },
  subscriptions() {
    return pick(this.$store.state.observables, ['inactiveAccounts']);
  },
  methods: {
    async setAddress() {
      if (!await this.$validator.validateAll()) return;
      if (this.activeAccount.address === this.accountToAddress) {
        await this.$store.dispatch('modals/open', {
          name: 'confirm',
          text: this.$t('transfer.send.to.confirm-sending-to-same-account'),
        });
      }
      this.$router.push({ name: 'send-to', params: { to: this.accountTo } });
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../../styles/variables';
@use '../../styles/functions';
@use '../../styles/typography';

.send .own-account {
  margin-top: functions.rem(20px);
  padding-bottom: functions.rem(20px);
  border-bottom: 2px solid variables.$color-neutral-positive-1;
  @extend %face-sans-s;
  font-weight: 500;
  color: variables.$color-neutral-negative-1;
}
</style>
