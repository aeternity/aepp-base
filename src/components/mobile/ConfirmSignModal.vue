<template>
  <MobilePage
    fill="primary"
    right-button-icon-name="close"
    @right-button-click="denyHandler"
  >
    <Guide fill="neutral">
      <em>Sign raw transaction</em>
      <br>by
      <AccountInline :address="activeIdentity.address" />
    </Guide>

    <DetailsRawData
      name="Data to sign"
      :data="data"
    />

    <AeButtonGroup slot="footer">
      <AeButton
        fill="light"
        @click="denyHandler"
      >
        Cancel
      </AeButton>
      <AeButton
        fill="secondary"
        @click="allowHandler"
      >
        Confirm
      </AeButton>
    </AeButtonGroup>
  </MobilePage>
</template>

<script>
import { mapGetters } from 'vuex';
import MobilePage from './Page.vue';
import Guide from '../Guide.vue';
import AccountInline from '../AccountInline.vue';
import DetailsRawData from './DetailsRawData.vue';
import AeButton from '../AeButton.vue';
import AeButtonGroup from '../AeButtonGroup.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AccountInline,
    DetailsRawData,
    AeButton,
    AeButtonGroup,
  },
  props: {
    resolve: { type: Function, required: true },
    reject: { type: Function, required: true },
    data: { type: [String, Uint8Array], required: true },
  },
  computed: mapGetters(['activeIdentity']),
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
