<template>
  <MobilePage
    :left-button-to="{ name: 'new-account' }"
    left-button-icon-name="back"
    class="new-account-create"
    title="New Account"
    hide-tab-bar
  >
    <Guide>
      <AeFraction
        slot="icon"
        numerator="2"
        denominator="4"
      />
      <p>
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
  }),
  methods: {
    async createSeed() {
      if (this.readingEnded) {
        this.$router.push({ name: 'new-account-confirm', params: { seed: this.seed } });
      } else {
        this.readingPaused = true;
        await this.$store.dispatch('modals/open', {
          name: 'alert',
          text: `
            That was too fast!
            Please make sure you write down the recovery phrase on paper... and keep it in a safe place.
          `,
        });
        this.readingPaused = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/placeholders/typography.scss';
@import '../../styles/variables/colors.scss';

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
