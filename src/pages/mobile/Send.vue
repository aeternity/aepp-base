<template>
  <MobilePage
    :right-button-to="{ name: 'transfer' }"
    right-button-icon-name="close"
    :header-fill="activeColor"
    class="send"
  >
    <template slot="header">
      <Guide fill="neutral">
        <AeFraction
          slot="icon"
          numerator="1"
          denominator="3"
        />
        <em>New Transfer</em>
        <br>from
        <AccountInline :address="activeAccount.address" />
      </Guide>

      <form
        :id="_uid"
        @submit.prevent="setAddress"
      >
        <AeInputAddress
          v-model="accountTo"
          v-validate="'required|address'"
          autofocus
          :error="errors.has('accountTo')"
          :footer="errors.first('accountTo')"
          name="accountTo"
          header="Recipient"
        />
      </form>
    </template>

    <AeButton
      :disabled="errors.any()"
      :form="_uid"
      fill="secondary"
      @click="setAddress"
    >
      Next
    </AeButton>

    <div
      v-if="inactiveAccounts.length"
      class="own-account"
    >
      Or send to subaccount
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
  </MobilePage>
</template>

<script>
import { pick } from 'lodash-es';
import { mapGetters } from 'vuex';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeFraction from '../../components/AeFraction.vue';
import AccountInline from '../../components/AccountInline.vue';
import AeInputAddress from '../../components/AeInputAddress.vue';
import AeButton from '../../components/AeButton.vue';
import ListItemAccount from '../../components/ListItemAccount.vue';
import { LeftMore } from '../../components/icons';

export default {
  components: {
    MobilePage,
    Guide,
    AeFraction,
    AccountInline,
    AeInputAddress,
    AeButton,
    ListItemAccount,
    LeftMore,
  },
  data: () => ({
    accountTo: '',
  }),
  computed: mapGetters('accounts', { activeAccount: 'active', activeColor: 'activeColor' }),
  subscriptions() {
    return pick(this.$store.state.observables, ['inactiveAccounts']);
  },
  methods: {
    async setAddress() {
      if (!await this.$validator.validateAll()) return;
      this.$router.push({ name: 'send-to', params: { to: this.accountTo } });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables/colors.scss';
@import '../../styles/placeholders/typography.scss';

.send .own-account {
  margin-top: rem(20px);
  padding-bottom: rem(20px);
  border-bottom: 2px solid $color-neutral-positive-1;
  @extend %face-sans-s;
  font-weight: 500;
  color: $color-neutral-negative-1;
}
</style>
