<template>
  <MobilePage
    class="address-book-no-contacts"
    title="Addresses"
  >
    <div class="banner">
      No saved contacts.
    </div>
    <ButtonAddFixed :to="{ name: 'address-book-new' }" />
  </MobilePage>
</template>

<script>
import MobilePage from '../components/mobile/Page.vue';
import ButtonAddFixed from '../components/ButtonAddFixed.vue';

export default {
  components: { MobilePage, ButtonAddFixed },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

.address-book-no-contacts .banner {
  @extend %face-sans-base;
}
</style>
