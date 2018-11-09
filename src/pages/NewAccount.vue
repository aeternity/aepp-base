<template>
  <mobile-page
    :redirect-to-on-close="{ name: 'intro' }"
    title="New Account"
    close-button
    class="new-account"
  >
    <guide
      fill="primary"
      icon="⅓"
    >
      Set up<img :src="sparklesEmoji">your
      <br><em>master account.</em>
      <br>We’re about to create
      <br>a recovery phrase,
      <br>please <strong>keep it safe</strong>
      <br>on a piece of paper!
      <br>
      <br><mark>Check the spelling</mark>
      <br>of each word and <em>never</em>
      <br>create a screenshot
      <br>or photo of this phrase
    </guide>

    <ae-button
      slot="footer"
      :to="{ name: 'new-account-create' }"
      size="medium"
      fill="secondary"
    >
      Generate Recovery Phrase
    </ae-button>
  </mobile-page>
</template>

<script>
import sparklesEmojiPath from 'emoji-datasource-apple/img/apple/64/2728.png';
import AeButton from '../components/AeButton.vue';
import MobilePage from '../components/MobilePage.vue';
import Guide from '../components/Guide.vue';

export default {
  components: { MobilePage, AeButton, Guide },
  data() {
    return {
      sparklesEmoji: sparklesEmojiPath,
    };
  },
};
</script>

<style lang="scss" src="../components/MobilePageContent.scss" scoped />
<style lang="scss" src="./FixedHeader.scss" scoped />
