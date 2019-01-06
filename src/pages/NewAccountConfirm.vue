<template>
  <mobile-page
    :left-button-to="{ name: 'new-account-create' }"
    left-button-icon-name="back"
    class="new-account-confirm"
    title="New Account"
  >
    <guide
      fill="primary"
      icon="⅔"
    >
      <em>Confirm<img :src="fingersCrossedEmoji">your phrase</em>
      <br>Tap the words below
      <br>to compose your phrase,
      <br><mark>note</mark> correct order!
    </guide>

    <button-mnemonic-word
      v-for="(word, index) in seedPermutation"
      :key="index"
      :disabled="selectedWordIds.includes(index)"
      @click="wordClick(index)"
    >
      {{ word }}
    </button-mnemonic-word>

    <div
      :class="{ error }"
      class="frame"
    >
      <div class="message" />
      <button-mnemonic-word
        v-for="index in selectedWordIds"
        :key="index"
        icon-close
        @click="wordClick(index)"
      >
        {{ seedPermutation[index] }}
      </button-mnemonic-word>
    </div>

    <ae-button
      slot="footer"
      :disabled="selectedWordIds.length !== seedPermutation.length"
      fill="secondary"
      @click="confirmPhrase"
    >
      Confirm
    </ae-button>
  </mobile-page>
</template>

<script>
import { shuffle } from 'lodash-es';
import fingersCrossedEmojiPath from 'emoji-datasource-apple/img/apple/64/1f91e.png';
import MobilePage from '../components/MobilePage.vue';
import Guide from '../components/Guide.vue';
import AeButton from '../components/AeButton.vue';
import ButtonMnemonicWord from '../components/mobile/ButtonMnemonicWord.vue';

export default {
  components: {
    MobilePage,
    AeButton,
    Guide,
    ButtonMnemonicWord,
  },
  props: {
    seed: { type: String, required: true },
  },
  data() {
    return {
      seedPermutation: shuffle(this.seed.split(' ')),
      selectedWordIds: [],
      fingersCrossedEmoji: fingersCrossedEmojiPath,
      error: false,
    };
  },
  computed: {
    selectedSeed() {
      return this.selectedWordIds.map(idx => this.seedPermutation[idx]).join(' ');
    },
  },
  methods: {
    wordClick(id) {
      this.error = false;
      const ids = this.selectedWordIds;
      if (ids.includes(id)) {
        ids.splice(ids.indexOf(id), 1);
      } else {
        ids.push(id);
      }
    },
    confirmPhrase() {
      this.error = this.selectedSeed !== this.seed;
      if (!this.error) {
        this.$router.push({ name: 'set-password', params: { seed: this.seed } });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.new-account-confirm {
  .frame {
    margin-top: rem(32px);
    @extend %face-sans-xs;
    color: $color-neutral-negative-1;

    .message {
      margin-bottom: rem(14px);

      &:before {
        content: "Your phrase";
      }
    }

    &.error {
      margin-left: rem(-15px);
      padding-left: rem(15px);
      border-left: 2px solid $color-primary;

      .message {
        margin-bottom: rem(7px);
        color: $color-primary;

        &:before {
          content: "Oops! That doesn't match, try again";
        }
      }
    }
  }
}
</style>
