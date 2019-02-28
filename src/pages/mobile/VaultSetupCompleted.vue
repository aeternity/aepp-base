<template>
  <MobilePage class="vault-setup-completed">
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
        numerator="3"
        denominator="3"
      />
      <em>Vault sync completed</em>
      <br>Find your AirGap Vault under your accounts.
    </Guide>

    <AeButton
      slot="footer"
      fill="alternative"
      :to="{ name: 'apps' }"
    >
      Finish
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
};
</script>

<style lang="scss" src="./VaultSetup.scss" scoped />
