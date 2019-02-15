<template>
  <mobile-page
    :right-button-to="{ name: 'intro' }"
    right-button-icon-name="close"
    title="New Account"
  >
    <guide
      fill="primary"
      icon="⅓"
    >
      Set up <img :src="sparklesEmoji"> your
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
      fill="secondary"
    >
      Generate Recovery Phrase
    </ae-button>
  </mobile-page>
</template>

<script>
import sparklesEmojiPath from 'emoji-datasource-apple/img/apple/64/2728.png';
import AeButton from '../../components/AeButton.vue';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';

export default {
  components: { MobilePage, AeButton, Guide },
  data() {
    return {
      sparklesEmoji: sparklesEmojiPath,
    };
  },
};
</script>
