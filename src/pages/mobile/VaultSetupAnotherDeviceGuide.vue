<template>
  <MobilePage
    class="vault-setup-another-device-guide"
    hide-tab-bar
    left-button-icon-name="back"
    :left-button-to="{ name: 'vault-setup-another-device' }"
  >
    <template slot="title">
      AirGap Setup
      <AeFraction
        numerator="3"
        denominator="3"
      />
    </template>

    <Guide fill="alternative">
      <AeFraction
        slot="icon"
        numerator="1"
        denominator="5"
      />
      <em>Open AirGap on the 2nd device</em>
      <br>Turn off the internet connection before opening AirGap.
    </Guide>
    <Guide fill="alternative">
      <AeFraction
        slot="icon"
        numerator="2"
        denominator="5"
      />
      <em>Create secret key</em>
      <br>No internet connection means maximum security for the key.
    </Guide>
    <Guide fill="alternative">
      <AeFraction
        slot="icon"
        numerator="3"
        denominator="5"
      />
      <em>Write it down in the right order</em>
      <br>You will need it for recovery.
    </Guide>
    <Guide fill="alternative">
      <AeFraction
        slot="icon"
        numerator="4"
        denominator="5"
      />
      <em>Add an æternity wallet</em>
      <br>Tap wallet, add wallet and choose æternity.
    </Guide>
    <Guide fill="alternative">
      <AeFraction
        slot="icon"
        numerator="5"
        denominator="5"
      />
      <em>Link your æternity wallet</em>
      <br>Finish by linking your vault to you æternity address.
    </Guide>

    <AeButton
      slot="footer"
      fill="alternative"
      @click="readValueFromQrCode"
    >
      Link Vault
    </AeButton>
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
  methods: {
    async readValueFromQrCode() {
      await this.$store.dispatch('accounts/airGap/createByQrCode', this.$route.params.accountName);
      this.$router.push({ name: 'vault-setup-completed' });
    },
  },
};
</script>

<style lang="scss" src="./VaultSetup.scss" scoped />
