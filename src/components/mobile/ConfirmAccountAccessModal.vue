<template>
  <Modal class="confirm-account-access-modal">
    <Guide>
      <img
        v-if="app.icon"
        :src="app.icon"
      > {{ app.name }}
      <br>requests access to
      <br><AccountInline :address="activeAccount.address" />
    </Guide>

    <DetailsPermission name="Accessing accounts">
      This aepp will be able to read your public key
    </DetailsPermission>

    <DetailsPermission name="Preparing transactions">
      This allows this app to prepare a transaction.
      You will need to sign the transaction manually.
    </DetailsPermission>

    <AeButtonGroup>
      <AeButton
        fill="secondary"
        @click="denyHandler"
      >
        Deny
      </AeButton>
      <AeButton @click="allowHandler">
        Allow
      </AeButton>
    </AeButtonGroup>

    <TabBar slot="footer" />
  </Modal>
</template>

<script>
import { mapGetters } from 'vuex';
import Modal from './Modal.vue';
import DetailsPermission from './DetailsPermission.vue';
import Guide from '../Guide.vue';
import AccountInline from '../AccountInline.vue';
import AeButton from '../AeButton.vue';
import AeButtonGroup from '../AeButtonGroup.vue';
import TabBar from './TabBar.vue';

export default {
  components: {
    Modal,
    Guide,
    AccountInline,
    DetailsPermission,
    AeButtonGroup,
    AeButton,
    TabBar,
  },
  props: {
    appHost: { type: String, required: true },
    resolve: { type: Function, required: true },
    reject: { type: Function, required: true },
  },
  computed: {
    ...mapGetters({ activeAccount: 'accounts/active' }),
    app() {
      return this.$store.getters.getAppMetadata(this.appHost);
    },
  },
  methods: {
    denyHandler() {
      this.reject(new Error('Rejected by user'));
    },
    allowHandler() {
      this.resolve();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.confirm-account-access-modal {
  /deep/ .modal-plain {
    max-width: rem(250px);
    padding: rem(32px);
  }

  .details-permission {
    --color-primary: #{$color-neutral-negative-3};
    --color-secondary: #{$color-neutral};
  }

  .ae-button-group {
    margin-left: rem(-16px);
    margin-top: rem(16px);
    margin-right: rem(-16px);
  }

  .tab-bar {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
</style>
