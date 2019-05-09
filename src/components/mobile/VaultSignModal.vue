<template>
  <MobilePage
    class="vault-sign-modal"
    fill="alternative"
    hide-tab-bar
    right-button-icon-name="close"
    @right-button-click="closeHandler"
  >
    <Guide fill="neutral">
      <AeFraction
        v-if="stepFraction"
        slot="icon"
        v-bind="stepFraction"
      />
      <em>Scan with AirGap Vault app</em> to sign the transaction
    </Guide>

    <AeQrCode
      :data="url"
      :size="220"
    />

    <AeButton
      slot="footer"
      fill="light"
      @click="resolve"
    >
      Done
    </AeButton>
  </MobilePage>
</template>

<script>
import { mapState } from 'vuex';
import MobilePage from './Page.vue';
import Guide from '../Guide.vue';
import AeFraction from '../AeFraction.vue';
import AeQrCode from '../AeQrCode.vue';
import AeButton from '../AeButton.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AeFraction,
    AeQrCode,
    AeButton,
  },
  props: {
    url: { type: String, required: true },
    resolve: { type: Function, required: true },
    reject: { type: Function, required: true },
  },
  computed: mapState({
    stepFraction: state => state.mobile.stepFraction,
  }),
  methods: {
    closeHandler() {
      this.reject(new Error('Cancelled by user'));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.vault-sign-modal .ae-qr-code {
  margin-left: auto;
  margin-right: auto;
  margin-top: rem(60px);
  background-color: $color-neutral-maximum;
}
</style>
