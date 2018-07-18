<template>
  <mobile-page
    :redirect-to-on-close="{ name: 'new-account' }"
    class="new-account-create"
    title="New Account"
    back-button
  >
    <h1>
      Carefully keep this phrase safe!
    </h1>
    <p>
      Write these 12 words down and
      keep them in a safe place. You
      need them to recover your account
      in the future.
    </p>
    <p class="mnemonic">
      {{ seed }}
    </p>

    <template slot="footer">
      <ae-button
        :inactive="!readingEnded"
        size="medium"
        type="exciting"
        @click="createSeed"
      >
        Next
      </ae-button>
      <div
        :style="{ animationPlayState: readingPaused ? 'paused' : 'running' }"
        class="progress"
        @animationend="readingEnded = true"
      />
    </template>
  </mobile-page>
</template>

<script>
import { AeButton } from '@aeternity/aepp-components'
import { generateMnemonic } from '@aeternity/bip39'
import MobilePage from '../components/MobilePage'

export default {
  components: { MobilePage, AeButton },
  data: () => ({
    seed: generateMnemonic(),
    readingPaused: false,
    readingEnded: false
  }),
  methods: {
    async createSeed () {
      if (this.readingEnded) {
        this.$router.push({ name: 'new-account-confirm', params: { seed: this.seed } })
      } else {
        this.readingPaused = true
        await this.$store.dispatch('alert', {
          title: 'That was to fast',
          text: 'Please make sure to write it down on paper, and don\'t loose it!'
        })
        this.readingPaused = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components/dist/variables.scss';

.new-account-create {
  .mnemonic {
    font-family: 'Roboto Mono', monospace;
    color: $aubergine;
    font-size: 20px;
    line-height: 1.55;
    letter-spacing: 0.3px;
    margin: 32px 0;
    font-weight: 500;
  }

  .progress {
    @keyframes increase-width {
      from { width: 0; }
      to { width: 100%; }
    }

    height: 7px;
    background: $maegenta;
    position: fixed;
    bottom: 0;
    left: 0;
    animation: increase-width 6s linear forwards;
  }
}
</style>
<style lang="scss" src="../components/MobilePageContent.scss" scoped />
