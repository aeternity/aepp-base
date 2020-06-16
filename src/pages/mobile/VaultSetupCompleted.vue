<template>
  <Page
    class="vault-setup-completed"
    hide-tab-bar
  >
    <template slot="title">
      {{ $t('air-gap.setup.title') }}
      <AeFraction
        numerator="3"
        denominator="3"
      />
    </template>

    <Guide
      :template="$t('air-gap.setup.completed.guide')"
      fill="alternative"
    >
      <AeFraction
        slot="icon"
        numerator="3"
        denominator="3"
      />
    </Guide>

    <AeButton
      slot="footer"
      fill="alternative"
      :to="$globals.ROUTE_MOBILE_LOGGED_IN"
    >
      {{ $t('air-gap.setup.completed.finish') }}
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
    Page, AeButton, Guide, AeFraction,
  },
};
</script>

<style lang="scss" src="./VaultSetup.scss" scoped />
