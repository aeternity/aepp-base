<template>
  <MobilePage
    class="vault-setup-method"
    hide-tab-bar
    right-button-icon-name="close"
    :right-button-to="{ name: 'apps' }"
  >
    <template slot="title">
      AirGap Setup
      <AeFraction
        numerator="1"
        denominator="3"
      />
    </template>
    <Guide fill="alternative">
      <AeFraction
        slot="icon"
        numerator="1"
        denominator="3"
      />
      <em>Robust security with AirGap Vault</em>
      <br>We recommend using a secondary offline device.
    </Guide>

    <ListItemChoose
      title="Maximum (recommended)"
      subtitle="Install AirGap on another device"
      :active="maximumSecure"
      :checked="maximumSecure"
      @click="maximumSecure = true"
    >
      <img
        slot="icon"
        :src="mobilePhoneEmoji"
      >
    </ListItemChoose>
    <ListItemChoose
      v-if="$globals.UNFINISHED_FEATURES"
      title="Normal"
      subtitle="Install AirGap on this device"
      :active="!maximumSecure"
      :checked="!maximumSecure"
      @click="maximumSecure = false"
    >
      <img
        slot="icon"
        :src="lockEmoji"
      >
    </ListItemChoose>

    <AeButton
      slot="footer"
      fill="alternative"
      :to="{ name: maximumSecure ? 'vault-setup-another-device' : 'vault-setup-same-device' }"
    >
      Next
    </AeButton>
  </MobilePage>
</template>

<script>
import mobilePhoneEmoji from 'emoji-datasource-apple/img/apple/64/1f4f1.png';
import lockEmoji from 'emoji-datasource-apple/img/apple/64/1f512.png';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeFraction from '../../components/AeFraction.vue';
import ListItemChoose from '../../components/ListItemChoose.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    MobilePage, AeButton, Guide, AeFraction, ListItemChoose,
  },
  data: () => ({
    mobilePhoneEmoji,
    lockEmoji,
    maximumSecure: true,
  }),
};
</script>

<style lang="scss" scoped>
@import '../../styles/globals/functions.scss';
@import './VaultSetup.scss';

.vault-setup-method .guide {
  margin-bottom: rem(79px);
}
</style>
