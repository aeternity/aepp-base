<template>
  <mobile-page
    :left-button-to="{ name: 'settings-network' }"
    left-button-icon-name="back"
    title="Connect to another node"
    header-fill="light"
    fill="neutral"
  >
    <ae-card fill="maximum">
      <network-add :finally-to="{ name: 'settings-network' }" />
    </ae-card>
  </mobile-page>
</template>

<script>
import MobilePage from '../../components/mobile/Page.vue';
import AeCard from '../../components/AeCard.vue';
import NetworkAdd from '../../components/NetworkAdd.vue';

export default {
  components: {
    MobilePage,
    AeCard,
    NetworkAdd,
  },
};
</script>
