<template>
  <AeModal class="confirm-account-access-modal">
    <Guide>
      <img
        v-if="app.icon"
        :src="app.icon"
      > {{ app.name }}
      <br>requests access to
      <br><AeIdenticon
        :address="activeIdentity.address"
        size="s"
      /> {{ activeIdentity.name }}
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
  </AeModal>
</template>

<script>
import { mapGetters } from 'vuex';
import { AeIdenticon } from '@aeternity/aepp-components-3';
import AeModal from '../AeModal.vue';
import DetailsPermission from './DetailsPermission.vue';
import Guide from '../Guide.vue';
import AeButton from '../AeButton.vue';
import AeButtonGroup from '../AeButtonGroup.vue';

export default {
  components: {
    AeModal,
    Guide,
    AeIdenticon,
    DetailsPermission,
    AeButtonGroup,
    AeButton,
  },
  props: {
    appHost: { type: String, required: true },
    resolve: { type: Function, required: true },
    reject: { type: Function, required: true },
  },
  computed: {
    ...mapGetters(['activeIdentity']),
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

.confirm-account-access-modal.ae-modal {
  background-color: rgba($color-neutral-positive-2, 0.8);

  /deep/ .modal {
    max-width: rem(250px);
    padding: rem(32px);
  }

  .ae-button-group {
    margin-left: rem(-16px);
    margin-top: rem(16px);
    margin-right: rem(-16px);
  }
}
</style>
