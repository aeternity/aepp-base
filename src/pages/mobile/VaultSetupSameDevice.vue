<template>
  <MobilePage
    class="vault-setup-same-device"
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
      <em>Install AirGap on this smartphone</em>
      <br>Installing AirGap on this device makes your Vault pretty safe.
      For maximum security, install AirGap Vault on another device.
    </Guide>

    <template slot="footer">
      <AeButton
        fill="alternative"
        :to="{ name: 'vault-setup-completed' }"
      >
        Sync with AirGap Vault
      </AeButton>
      <AeButton
        to="https://itunes.apple.com/us/app/airgap-vault-secure-secrets/id1417126841?l=de&ls=1&mt=8"
        plain
      >
        Install AirGap Vault
      </AeButton>
    </template>
  </MobilePage>
</template>

<script>
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeFraction from '../../components/AeFraction.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    MobilePage, AeButton, Guide, AeFraction,
  },
};
</script>

<style lang="scss" src="./VaultSetup.scss" scoped />
