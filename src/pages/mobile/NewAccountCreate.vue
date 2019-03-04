<template>
  <MobilePage
    :left-button-to="{ name: 'new-account' }"
    left-button-icon-name="back"
    class="new-account-create"
    title="New Account"
  >
    <Guide>
      <AeFraction
        slot="icon"
        numerator="2"
        denominator="4"
      />
      <p class="big">
        You need the <em>recovery phrase</em> in case you
        forget your <strong>password</strong>.
      </p>
      <p>
        Now go ahead, <mark>write it down</mark>
        in the correct order.
      </p>
    </Guide>
    <p class="mnemonic">
      {{ seed }}
    </p>

    <AeButton
      slot="footer"
      fill="secondary"
      @click="createSeed"
    >
      I wrote it down
    </AeButton>

    <div
      :style="{ animationPlayState: readingPaused ? 'paused' : 'running' }"
      class="progress"
      @animationend="readingEnded = true"
    />
  </MobilePage>
</template>

<script>
import { generateMnemonic } from '@aeternity/bip39';
import keyEmojiPath from 'emoji-datasource-apple/img/apple/64/1f511.png';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeFraction from '../../components/AeFraction.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    MobilePage, AeButton, Guide, AeFraction,
  },
  data: () => ({
    seed: generateMnemonic(),
    readingPaused: false,
    readingEnded: false,
    keyEmoji: keyEmojiPath,
  }),
  methods: {
    async createSeed() {
      if (this.readingEnded) {
        this.$router.push({ name: 'new-account-confirm', params: { seed: this.seed } });
      } else {
        this.readingPaused = true;
        await this.$store.dispatch('alert', {
          title: 'That was too fast',
          text: 'Please make sure to write it down on paper, and don\'t loose it!',
        });
        this.readingPaused = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.new-account-create {
  .mnemonic {
    @extend %face-mono-s;
    line-height: 1.67;
    color: $color-neutral-negative-3;
  }

  .progress {
    @keyframes increase-width {
      from { width: 0; }
      to { width: 100%; }
    }

    height: 7px;
    background: $color-primary;
    position: fixed;
    bottom: 0;
    left: 0;
    animation: increase-width 6s linear forwards;
  }
}
</style>
