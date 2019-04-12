<template>
  <MobilePage
    :left-button-to="{ name: 'new-account-create' }"
    left-button-icon-name="back"
    class="new-account-confirm"
    title="New Account"
  >
    <Guide>
      <AeFraction
        slot="icon"
        numerator="3"
        denominator="4"
      />
      <em>Tap the words</em> in the
      correct order to recreate
      your phrase.
    </Guide>

    <ButtonMnemonicWord
      v-for="(word, index) in seedPermutation"
      :key="index"
      :disabled="selectedWordIds.includes(index)"
      @click="wordClick(index)"
    >
      {{ word }}
    </ButtonMnemonicWord>

    <AeInputWrapper
      :error="error"
      :header="error ? 'Oops! Not the correct order, try again' : 'Your recovery phrase'"
    >
      <template v-if="selectedWordIds.length">
        <ButtonMnemonicWord
          v-for="index in selectedWordIds"
          :key="index"
          icon-close
          @click="wordClick(index)"
        >
          {{ seedPermutation[index] }}
        </ButtonMnemonicWord>
      </template>
      <ButtonMnemonicWord
        v-for="placeholderWord in ['first', 'second', 'third', '···']"
        v-else
        :key="placeholderWord"
        disabled
      >
        {{ placeholderWord }}
      </ButtonMnemonicWord>
    </AeInputWrapper>

    <AeButton
      slot="footer"
      :disabled="selectedWordIds.length !== seedPermutation.length"
      fill="secondary"
      @click="confirmPhrase"
    >
      Confirm
    </AeButton>
  </MobilePage>
</template>

<script>
import { shuffle } from 'lodash-es';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeFraction from '../../components/AeFraction.vue';
import AeButton from '../../components/AeButton.vue';
import ButtonMnemonicWord from '../../components/mobile/ButtonMnemonicWord.vue';
import AeInputWrapper from '../../components/AeInputWrapper.vue';

export default {
  components: {
    MobilePage,
    AeButton,
    Guide,
    AeFraction,
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
