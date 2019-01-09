<template>
  <mobile-page>
    <guide>
      {{ appName }} requests access
    </guide>

    <confirm-modal-permission name="Accessing accounts">
      This aepp will be able to read your public key
    </confirm-modal-permission>

    <confirm-modal-permission name="Preparing transactions">
      This allows this app to prepare a transaction.
      You will need to sign the transaction manually.
    </confirm-modal-permission>

    <ae-button-group slot="footer">
      <ae-button
        fill="secondary"
        @click="denyHandler"
      >
        Deny
      </ae-button>
      <ae-button @click="allowHandler">
        Allow
      </ae-button>
    </ae-button-group>
  </mobile-page>
</template>

<script>
import MobilePage from './Page.vue';
import ConfirmModalPermission from './ConfirmModalPermission.vue';
import Guide from '../Guide.vue';
import AeButton from '../AeButton.vue';
import AeButtonGroup from '../AeButtonGroup.vue';

export default {
  components: {
    MobilePage,
    Guide,
    ConfirmModalPermission,
    AeButtonGroup,
    AeButton,
  },
  props: {
    appName: { type: String, required: true },
    resolve: { type: Function, required: true },
    reject: { type: Function, required: true },
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
