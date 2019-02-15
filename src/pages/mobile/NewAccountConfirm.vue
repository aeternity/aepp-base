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
      <em>Confirm <img :src="fingersCrossedEmoji"> your phrase</em>
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

    <ae-input-wrapper
      :error="error"
      :header="error ? 'Oops! That doesn\'t match, try again' : 'Your phrase'"
    >
      <template v-if="selectedWordIds.length">
        <button-mnemonic-word
          v-for="index in selectedWordIds"
          :key="index"
          icon-close
          @click="wordClick(index)"
        >
          {{ seedPermutation[index] }}
        </button-mnemonic-word>
      </template>
      <button-mnemonic-word
        v-for="placeholderWord in ['first', 'second', 'third', '···']"
        v-else
        :key="placeholderWord"
        disabled
      >
        {{ placeholderWord }}
      </button-mnemonic-word>
    </ae-input-wrapper>

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
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeButton from '../../components/AeButton.vue';
import ButtonMnemonicWord from '../../components/mobile/ButtonMnemonicWord.vue';
import AeInputWrapper from '../../components/AeInputWrapper.vue';

export default {
  components: {
    MobilePage,
    AeButton,
    Guide,
    AeInputWrapper,
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
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';

.new-account-confirm .ae-input-wrapper {
  margin-top: rem(32px);
  background: transparent;
}
</style>
