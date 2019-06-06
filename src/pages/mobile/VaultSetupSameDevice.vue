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
      <em>Install or open AirGap on this smartphone</em>
      <br>Open the AirGap Vault app, open the account you would like to sync,
      tap on the three dots in the top right corner, and select Copy Sync Code.
    </Guide>

    <template slot="footer">
      <AeButton
        fill="alternative"
        :to="{ name: 'vault-setup-same-device-sync' }"
      >
        Next
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
