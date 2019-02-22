<template>
  <MobilePage
    :left-button-to="{ name: 'settings-network' }"
    left-button-icon-name="back"
    title="Connect to another node"
    header-fill="light"
    fill="neutral"
  >
    <AeCard fill="maximum">
      <NetworkAdd :finally-to="{ name: 'settings-network' }" />
    </AeCard>
  </MobilePage>
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
