<template>
  <MobilePage
    :right-button-to="{ name: 'name-details', params: { name } }"
    right-button-icon-name="close"
    :header-fill="activeColor"
    class="name-transfer"
    hide-tab-bar
  >
    <template slot="header">
      <Guide
        :template="$t('name.transfer.guide')"
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
      :form="_uid"
      fill="secondary"
    >
      <AeLoader v-if="busy" /> {{ $t('next') }}
    </AeButton>

    <template v-if="!busy && inactiveAccounts.length">
      <div class="own-account">
        {{ $t('name.transfer.subaccount') }}
      </div>
      <ListItemAccount
        v-for="account in inactiveAccounts"
        :key="account.address"
        border-dark
        v-bind="account"
        @click="transferToAccount(account.address)"
      >
        <LeftMore slot="right" />
      </ListItemAccount>
    </template>
  </MobilePage>
</template>

<script>
import { pick } from 'lodash-es';
import { mapState, mapGetters } from 'vuex';
import { handleUnknownError } from '../../lib/utils';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AccountInline from '../../components/AccountInline.vue';
import AeInputAccount from '../../components/AeInputAccount.vue';
import AeButton from '../../components/AeButton.vue';
import AeLoader from '../../components/AeLoader.vue';
import ListItemAccount from '../../components/ListItemAccount.vue';
import { LeftMore } from '../../components/icons';

export default {
  components: {
    MobilePage,
    Guide,
    AccountInline,
    AeInputAccount,
    AeButton,
    AeLoader,
    ListItemAccount,
    LeftMore,
  },
  props: {
    name: { type: String, required: true },
  },
  data: () => ({ accountTo: '', busy: false }),
  computed: {
    ...mapState('names', {
      nameRecord({ owned }) {
        return owned.find(({ name }) => name === this.name);
      },
    }),
    ...mapGetters('accounts', { activeAccount: 'active', activeColor: 'activeColor' }),
  },
  subscriptions() {
    return pick(this.$store.state.observables, ['inactiveAccounts']);
  },
  mounted() {
    const initialAccountIdx = this.$store.state.accounts.activeIdx;
    const requredAccountIdx = this.$store.state.accounts.list
      .findIndex(({ address }) => address === this.nameRecord.owner);
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
      if (this.activeAccount.address === this.accountTo) {
        await this.$store.dispatch('modals/open', {
          name: 'confirm',
          text: this.$t('name.transfer.confirm-transfering-to-same-account'),
        });
      }
      this.busy = true;
      try {
        await this.$store.state.sdk.aensTransfer(this.nameRecord.nameHash, this.accountTo);
        this.$store.dispatch('modals/open', {
          name: 'notification',
          text: this.$t('name.transfer.notification.succeed', { name: this.name }),
        });
        this.$router.push({ name: 'name-details', params: { name: this.name } });
      } catch (e) {
        if (e.message === 'Rejected by user') return;
        this.$store.dispatch('modals/open', {
          name: 'notification',
          text: this.$t('name.transfer.notification.failed', { name: this.name }),
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
@import '../../styles/variables/colors.scss';
@import '../../styles/placeholders/typography.scss';

.name-transfer {
  .ae-button .ae-loader {
    width: rem(24px);
    vertical-align: middle;
  }

  .own-account {
    margin-top: rem(20px);
    padding-bottom: rem(20px);
    border-bottom: rem(2px) solid $color-neutral-positive-1;
    @extend %face-sans-s;
    font-weight: 500;
    color: $color-neutral-negative-1;
  }
}
</style>
