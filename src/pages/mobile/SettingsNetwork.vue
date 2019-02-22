<template>
  <MobilePage
    :left-button-to="{ name: 'settings' }"
    left-button-icon-name="back"
    title="Network"
    header-fill="light"
    fill="neutral"
  >
    <AeCard fill="maximum">
      <NetworkSwitcher :network-add-button-to="{ name: 'settings-network-new' }" />
    </AeCard>
  </MobilePage>
</template>

<script>
import MobilePage from '../../components/mobile/Page.vue';
import AeCard from '../../components/AeCard.vue';
import NetworkSwitcher from '../../components/NetworkSwitcher.vue';

export default {
  components: {
    MobilePage,
    AeCard,
    NetworkSwitcher,
  },
};
</script>
