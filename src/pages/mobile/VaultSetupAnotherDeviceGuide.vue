<template>
  <Page
    class="vault-setup-another-device-guide"
    hide-tab-bar
    left-button-icon-name="back"
    :left-button-to="{ name: 'vault-setup-another-device' }"
  >
    <template slot="title">
      {{ $t('air-gap.setup.title') }}
      <AeFraction numerator="3" denominator="3" />
    </template>

    <Guide
      v-for="(step, idx) in $t('air-gap.setup.another-device.guide.steps')"
      :key="idx"
      :template="step"
      fill="alternative"
    >
      <AeFraction
        slot="icon"
        :numerator="idx + 1"
        :denominator="$t('air-gap.setup.another-device.guide.steps').length"
      />
    </Guide>

    <AeButton slot="footer" fill="alternative" @click="readValueFromQrCode">
      {{ $t('air-gap.link-vault') }}
    </AeButton>
  </Page>
</template>

<script>
import Page from '../../components/Page.vue';
import Guide from '../../components/Guide.vue';
import AeFraction from '../../components/AeFraction.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    Page,
    AeButton,
    Guide,
    AeFraction,
  },
  methods: {
    async readValueFromQrCode() {
      await this.$store.dispatch('accounts/airGap/createByQrCode');
      this.$router.push({ name: 'vault-setup-completed' });
    },
  },
};
</script>

<style lang="scss" src="./VaultSetup.scss" scoped />
