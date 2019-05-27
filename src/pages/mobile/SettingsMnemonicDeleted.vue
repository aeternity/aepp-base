<template>
  <MobilePage
    :right-button-to="{ name: 'settings' }"
    right-button-icon-name="close"
    title="Backup Recovery Phrase"
    hide-tab-bar
  >
    <Guide>
      You have deleted the recovery phrase from this device.
      <mark>Please look for the backup that you made before deleting it.</mark>
    </Guide>

    <AeButton
      slot="footer"
      :to="{ name: 'settings' }"
      fill="secondary"
    >
      Back
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
