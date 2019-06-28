<template>
  <MobilePage
    :left-button-to="{ name: 'settings-mnemonic-show' }"
    left-button-icon-name="back"
    :right-button-to="{ name: 'settings' }"
    right-button-icon-name="close"
    class="settings-mnemonic-confirm"
    title="Backup Recovery Phrase"
    hide-tab-bar
  >
    <Guide>
      <AeFraction
        slot="icon"
        numerator="3"
        denominator="4"
      />
      <p>
        <em>Confirm <img :src="crossedFingersEmoji"> your phrase</em>
      </p>
      <p>
        Tap the words below
        to compose your phrase,
        <mark>note</mark> correct order!
      </p>
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
import crossedFingersEmoji from 'emoji-datasource-apple/img/apple/64/1f91e.png';
import { mapState } from 'vuex';
import { shuffle } from 'lodash-es';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeFraction from '../../components/AeFraction.vue';
import ButtonMnemonicWord from '../../components/mobile/ButtonMnemonicWord.vue';
import AeInputWrapper from '../../components/AeInputWrapper.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AeFraction,
    ButtonMnemonicWord,
    AeInputWrapper,
    AeButton,
  },
  data: () => ({
    selectedWordIds: [],
    error: false,
    crossedFingersEmoji,
  }),
  computed: {
    ...mapState('accounts/hdWallet', ['mnemonic']),
    mnemonicPermutation() {
      const words = this.mnemonic.split(' ');
      return process.env.NODE_ENV === 'production' ? shuffle(words) : words;
    },
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
      if (this.error) return;
      this.$store.commit('accounts/hdWallet/markMnemonicAsBackedUp');
      this.$router.push({ name: 'settings-mnemonic-confirmed' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/globals/functions.scss';

.settings-mnemonic-confirm .ae-input-wrapper {
  margin-top: rem(32px);
  background: transparent;
}
</style>
