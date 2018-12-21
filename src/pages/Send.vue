<template>
  <mobile-page
    :redirect-to-on-close="{ name: 'transfer' }"
    class="send"
    fill="primary"
    close-button
  >
    <guide
      fill="neutral"
      icon="⅓"
    >
      <em>New Transfer</em>
      <br>from
      <ae-identicon
        :address="activeIdentity.address"
        size="s"
      /><em>{{ activeIdentity.name }}</em>
    </guide>

    <ae-input-address
      v-model="accountTo"
      v-validate="'required|address'"
      :error="errors.has('accountTo')"
      name="accountTo"
      label="To"
      placeholder="ak_"
    />

    <template slot="content-bottom">
      <ae-button
        :disabled="errors.any()"
        fill="secondary"
        @click="setAddress"
      >
        Next
      </ae-button>

      <div
        v-if="identities.length > 1"
        class="own-account"
      >
        Or transfer between accounts
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
    </template>
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
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.send {
  /deep/ .panel .bottom {
    margin-top: rem(-32px);
    margin-bottom: rem(100px);

    .list-item .content {
      border: none;
    }
  }

  .ae-button {
    margin: rem(60px) auto rem(30px) auto;
  }

  .own-account {
    margin: 0 0 rem(20px) rem(16px);
    font-weight: 500;
    color: $color-neutral-negative-1;
  }

  .list-item {
    margin: 0 rem(15px);
    padding: 0;
    border-top: 2px solid $color-neutral-positive-1;

    .ae-icon {
      font-size: rem(20px);
    }
  }

  .guide {
    margin: 0 0 rem(30px) rem(30px);

    .ae-identicon {
      margin: 0 rem(2px) rem(-4px) rem(2px);
    }
  }
}
</style>
<style lang="scss" src="../components/MobilePageContent.scss" scoped />
