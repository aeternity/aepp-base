<template>
  <mobile-page
    :left-button-to="{ name: 'settings' }"
    left-button-icon-name="back"
    title="Network"
    header-fill="light"
    fill="neutral"
  >
    <ae-card fill="maximum">
      <network-switcher :network-add-button-to="{ name: 'settings-network-new' }" />
    </ae-card>
  </mobile-page>
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
