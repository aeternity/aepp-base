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
      First, you will get a
                          <br>phrase for <strong>account</strong>
                          <br><strong>recovery</strong>.
                          <br>
                          <br>So grab a piece of
                          <br>paper and a pen, <mark>write</mark>
                          <br><mark>it down</mark>.
                          <br>
                          <br>And hide it from all <em>evil</em>.
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
