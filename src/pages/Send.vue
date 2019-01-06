<template>
  <mobile-page
    :right-button-to="{ name: 'transfer' }"
    right-button-icon-name="close"
    header-fill="primary"
    class="send"
  >
    <template slot="header">
      <guide
        fill="neutral"
        icon="⅓"
      >
        <em>New Transfer</em>
        <br>from
        <ae-identicon
          :address="activeIdentity.address"
          size="s"
        />
        {{ ' ' }}
        <em>{{ activeIdentity.name }}</em>
      </guide>

      <form
        :id="_uid"
        @submit.prevent="setAddress"
      >
        <ae-input-address
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

    <ae-button
      :disabled="errors.any()"
      :form="_uid"
      fill="secondary"
      @click="setAddress"
    >
      Next
    </ae-button>

    <div
      v-if="identities.length > 1"
      class="own-account"
    >
      Or transfer to your own account
    </div>
    <list-item-account
      v-for="account in identities.filter(i => i !== activeIdentity)"
      :key="account.address"
      :to="{
        name: 'send-to',
        params: { to: account.address }
      }"
      v-bind="account"
    >
      <ae-icon
        slot="right"
        name="left-more"
      />
    </list-item-account>
  </mobile-page>
</template>

<script>
import { mapGetters } from 'vuex';
import { AeIdenticon, AeIcon } from '@aeternity/aepp-components-3';
import MobilePage from '../components/MobilePage.vue';
import Guide from '../components/Guide.vue';
import AeInputAddress from '../components/AeInputAddress.vue';
import AeButton from '../components/AeButton.vue';
import ListItemAccount from '../components/ListItemAccount.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AeIdenticon,
    AeInputAddress,
    AeButton,
    ListItemAccount,
    AeIcon,
  },
  data: () => ({
    accountTo: '',
  }),
  computed: mapGetters(['activeIdentity', 'identities']),
  mounted() {
    this.$store.dispatch('updateAllBalances');
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
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

.send {
  .own-account {
    margin: rem(20px) 0;
    @extend %face-sans-s;
    font-weight: 500;
    color: $color-neutral-negative-1;
  }

  .list-item {
    margin: 0 rem(16px);
    padding: 0;
    border-top: 2px solid $color-neutral-positive-1;

    /deep/ .content {
      border: none;
    }

    .ae-icon {
      font-size: rem(20px);
    }
  }
}
</style>
