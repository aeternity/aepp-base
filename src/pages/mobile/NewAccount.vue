<template>
  <MobilePage
    :right-button-to="{ name: 'intro' }"
    right-button-icon-name="close"
    title="New Account"
    hide-tab-bar
  >
    <Guide>
      <AeFraction
        slot="icon"
        numerator="1"
        denominator="4"
      />
      <p>
        First, you will get a
        phrase for <strong>account recovery</strong>.
      </p>
      <p>
        So grab a piece of
        paper and a pen, <mark>write it down</mark>.
      </p>
      <p>
        And hide it from all <em>evil</em>.
      </p>
    </Guide>

    <AeButton
      slot="footer"
      :to="{ name: 'new-account-create' }"
      fill="secondary"
    >
      Generate Recovery Phrase
    </AeButton>
  </MobilePage>
</template>

<script>
import sparklesEmoji from 'emoji-datasource-apple/img/apple/64/2728.png';
import AeButton from '../../components/AeButton.vue';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeFraction from '../../components/AeFraction.vue';

export default {
  components: {
    MobilePage, AeButton, Guide, AeFraction,
  },
  data() {
    return {
      sparklesEmoji,
    };
  },
};
</script>
