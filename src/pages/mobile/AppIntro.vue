<template>
  <MobilePage
    fill="dark"
    :right-button-to="{ name: 'apps' }"
    right-button-icon-name="close"
    class="app-intro"
  >
    <Guide>
      <em>Welcome to the æpps browser!</em>
    </Guide>
    <p class="big">
      This part of the Base æpp Wallet is in beta. It is safe to use,
      but we are in the process of refining the experience.
    </p>
    <Guide>
      <em>What is an æpp?</em>
    </Guide>
    <p class="big">
      æpps are decentralized applications powered by the æternity blockchain.
    </p>
  </MobilePage>
</template>

<script>
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';

export default {
  components: { MobilePage, Guide },
};
</script>

<style lang="scss" scoped>
@import '../../styles/placeholders/typography.scss';

.app-intro {
  .guide {
    margin-bottom: 0;
  }

  p.big {
    margin-top: rem(5px);
    @extend %face-sans-base;
    color: #fff;
  }
}
</style>
