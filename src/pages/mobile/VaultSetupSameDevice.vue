<template>
  <Page
    class="vault-setup-same-device"
    hide-tab-bar
    left-button-icon-name="back"
    right-button-icon-name="close"
    :left-button-to="{ name: 'vault-setup-method' }"
    :right-button-to="$globals.ROUTE_MOBILE_LOGGED_IN"
  >
    <template slot="title">
      {{ $t('air-gap.setup.title') }}
      <AeFraction
        numerator="2"
        denominator="3"
      />
    </template>
    <Guide
      :template="$t('air-gap.setup.same-device.install.guide')"
      fill="alternative"
    >
      <AeFraction
        slot="icon"
        numerator="2"
        denominator="3"
      />
    </Guide>

    <template slot="footer">
      <AeButton
        fill="alternative"
        :to="{ name: 'vault-setup-same-device-sync' }"
      >
        {{ $t('next') }}
      </AeButton>
      <AeButton
        :to="INSTALL_URL"
        plain
      >
        {{ $t('air-gap.setup.same-device.install.button') }}
      </AeButton>
    </template>
  </Page>
</template>

<script>
import Page from '../../components/Page.vue';
import Guide from '../../components/Guide.vue';
import AeFraction from '../../components/AeFraction.vue';
import AeButton from '../../components/AeButton.vue';
import { INSTALL_URL } from '../../lib/airGap';

export default {
  components: {
    Page, AeButton, Guide, AeFraction,
  },
  data: () => ({ INSTALL_URL }),
};
</script>

<style lang="scss" src="./VaultSetup.scss" scoped />
