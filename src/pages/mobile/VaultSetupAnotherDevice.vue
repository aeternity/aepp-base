<template>
  <MobilePage
    class="vault-setup-another-device"
    hide-tab-bar
    left-button-icon-name="back"
    right-button-icon-name="close"
    :left-button-to="{ name: 'vault-setup-method' }"
    :right-button-to="{ name: 'apps' }"
  >
    <template slot="title">
      AirGap Setup
      <AeFraction
        numerator="2"
        denominator="3"
      />
    </template>
    <Guide fill="alternative">
      <AeFraction
        slot="icon"
        numerator="2"
        denominator="3"
      />
      <em>Install AirGap on another phone</em>
      <br>Search for AirGap.it in the
      store or scan this QR code.
    </Guide>

    <AeQrCode data="https://airgap.it/" />

    <AeButton
      slot="footer"
      fill="alternative"
      :to="{ name: 'vault-setup-another-device-guide' }"
    >
      Link
    </AeButton>
  </MobilePage>
</template>

<script>
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeFraction from '../../components/AeFraction.vue';
import { AeQrCode } from '../../components/async';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    MobilePage, AeButton, Guide, AeFraction, AeQrCode,
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/globals/functions.scss';
@import './VaultSetup.scss';

.vault-setup-another-device .guide {
  margin-bottom: rem(41px);
}
</style>
