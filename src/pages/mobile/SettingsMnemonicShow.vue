<template>
  <MobilePage
    :left-button-to="{ name: 'settings-mnemonic' }"
    left-button-icon-name="back"
    :right-button-to="{ name: 'settings' }"
    right-button-icon-name="close"
    class="settings-mnemonic-show"
    title="Backup Recovery Phrase"
    hide-tab-bar
  >
    <Guide>
      <AeFraction
        slot="icon"
        numerator="2"
        denominator="4"
      />
      <p>
        <em>Carefully keep this phrase <img :src="keyEmoji"> safe!</em>
      </p>
      <p>
        Write these 12 words
        down and keep them
        <strong>in a safe place</strong>. You need
        them to <mark>recover</mark> your
        account in the future.
      </p>
    </Guide>
    <p class="mnemonic">
      {{ mnemonic }}
    </p>

    <AeButton
      slot="footer"
      fill="secondary"
      :to="readingEnded ? { name: 'settings-mnemonic-confirm' } : undefined"
      @click="nextClickHandler"
    >
      Next
    </AeButton>

    <div
      :style="{ animationPlayState: readingPaused ? 'paused' : 'running' }"
      class="progress"
      @animationend="readingEnded = true"
    />
  </MobilePage>
</template>

<script>
import keyEmoji from 'emoji-datasource-apple/img/apple/64/1f511.png';
import { mapState } from 'vuex';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeFraction from '../../components/AeFraction.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    MobilePage, AeButton, Guide, AeFraction,
  },
  data: () => ({
    readingPaused: false,
    readingEnded: false,
    keyEmoji,
  }),
  computed: mapState('accounts/hdWallet', ['mnemonic']),
  methods: {
    async nextClickHandler() {
      if (this.readingEnded) return;
      this.readingPaused = true;
      await this.$store.dispatch('modals/open', {
        name: 'alert',
        text: `
          That was too fast!
          Please make sure you write down the recovery phrase on paper... and keep it in a safe place.
        `,
      });
      this.readingPaused = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/placeholders/typography.scss';
@import '../../styles/variables/colors.scss';

.settings-mnemonic-show.mobile-page {
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
