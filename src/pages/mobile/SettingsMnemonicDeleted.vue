<template>
  <MobilePage
    :right-button-to="{ name: 'settings' }"
    right-button-icon-name="close"
    :title="$t('settings.mnemonic.title')"
    hide-tab-bar
  >
    <Guide :template="$t('settings.mnemonic.deleted.guide')" />

    <AeButton
      slot="footer"
      :to="{ name: 'settings' }"
      fill="secondary"
    >
      {{ $t('settings.mnemonic.deleted.back') }}
    </AeButton>
  </MobilePage>
</template>

<script>
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    MobilePage, Guide, AeButton,
  },
};
</script>
