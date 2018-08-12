<template>
  <mobile-page
    :redirect-to-on-close="{ name: 'new-account-create' }"
    class="new-account-confirm"
    title="New Account"
    back-button
  >
    <h1>
      Confirm your<br>phrase
    </h1>
    <div
      :class="{ mnemonic: selectedSeed }"
      class="frame"
    >
      {{ selectedSeed || 'Tap the words below to add them here, note the correct order!' }}
    </div>

    <img
      :src="require('emoji-datasource-apple/img/apple/64/1f446.png')"
      class="icon-hand">

    <div class="words">
      <ae-button
        v-for="(word, index) in seedPermutation"
        :disabled="selectedWordIds.includes(index)"
        :key="index"
        size="small"
        type="exciting"
        uppercase
        plain
        @click="wordClick(index)"
      >
        {{ word }}
      </ae-button>
    </div>

    <ae-button
      slot="footer"
      :disabled="selectedWordIds.length !== seedPermutation.length"
      size="medium"
      type="exciting"
      @click="confirmPhrase"
    >
      Confirm Phrase
    </ae-button>
  </mobile-page>
</template>

<script>
import { AeButton } from '@aeternity/aepp-components';
import { shuffle } from 'lodash-es';
import MobilePage from '../components/MobilePage.vue';

export default {
  components: { MobilePage, AeButton },
  props: {
    seed: { type: String, required: true },
  },
  data() {
    return {
      seedPermutation: shuffle(this.seed.split(' ')),
      selectedWordIds: [],
    };
  },
  computed: {
    selectedSeed() {
      return this.selectedWordIds.map(idx => this.seedPermutation[idx]).join(' ');
    },
  },
  methods: {
    wordClick(index) {
      if (this.selectedWordIds.includes(index)) return;
      this.selectedWordIds.push(index);
    },
    async confirmPhrase() {
      const isValid = this.selectedSeed === this.seed;
      await this.$store.dispatch('alert', isValid ? {
        title: 'Correct Passphrase!',
        text: 'Proceed to your æpp browser. Enjoy the æpp ecosystem!',
        buttonText: 'Create password',
      } : {
        title: 'Incorrect passphrase',
        text: 'You\'ve entered a wrong passphrase, try again before proceeding.',
        buttonText: 'Try again',
      });
      if (isValid) {
        this.$router.push({ name: 'set-password', params: { seed: this.seed } });
      } else {
        this.selectedWordIds = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components/dist/variables.scss';

.new-account-confirm {
  .frame {
    box-sizing: border-box;
    height: 170px;
    margin: 20px auto;
    padding: 40px 60px 0;
    border: 2px solid #d8d8d8;
    border-radius: 10px;
    font-size: 18px;
    line-height: 1.56;
    text-align: center;
    color: $grey;

    &.mnemonic {
      padding: 20px 30px 0;
      font-family: 'Roboto Mono', monospace;
      color: $aubergine;
      font-size: 20px;
      line-height: 1.55;
      letter-spacing: 0.3px;
      font-weight: 500;
    }
  }

  .icon-hand {
    display: block;
    margin: 30px auto;
    height: 40px;
  }

  .words {
    text-align: center;

    .ae-button._plain {
      margin: 3.5px 2.5px;
      background-color: $aubergine;
      color: $white;
      border: 2px solid $aubergine;
      box-sizing: content-box;

      &._disabled {
        background-color: transparent;
        border-color: $grey;
        color: $grey;
      }
    }
  }
}
</style>
<style lang="scss" src="../components/MobilePageContent.scss" scoped />
