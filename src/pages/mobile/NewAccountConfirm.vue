<template>
  <MobilePage
    :left-button-to="{ name: 'new-account-create' }"
    left-button-icon-name="back"
    class="new-account-confirm"
    title="New Account"
    hide-tab-bar
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
      v-for="(word, index) in mnemonicPermutation"
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
          {{ mnemonicPermutation[index] }}
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
      :disabled="selectedWordIds.length !== mnemonicPermutation.length"
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
    mnemonic: { type: String, required: true },
  },
  data() {
    return {
      mnemonicPermutation: shuffle(this.mnemonic.split(' ')),
      selectedWordIds: [],
      error: false,
    };
  },
  computed: {
    selectedMnemonic() {
      return this.selectedWordIds.map(idx => this.mnemonicPermutation[idx]).join(' ');
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
      this.error = this.selectedMnemonic !== this.mnemonic;
      if (!this.error) {
        this.$router.push({ name: 'set-password', params: { mnemonic: this.mnemonic } });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/globals/functions.scss';

.new-account-confirm .ae-input-wrapper {
  margin-top: rem(32px);
  background: transparent;
}
</style>
