<template>
  <Page
    :right-button-to="{ name: 'settings' }"
    right-button-icon-name="close"
    :title="$t('settings.mnemonic.title')"
    hide-tab-bar
  >
    <Guide :template="$t('settings.mnemonic.guide')">
      <AeFraction
        slot="icon"
        numerator="1"
        denominator="4"
      />
    </Guide>

    <AeButton
      slot="footer"
      :to="{ name: 'settings-mnemonic-show' }"
      fill="secondary"
    >
      {{ $t('settings.mnemonic.to-show') }}
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
    Page, Guide, AeFraction, AeButton,
  },
};
</script>
