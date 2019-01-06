<template>
  <mobile-page
    :right-button-to="{ name: 'intro' }"
    right-button-icon-name="close"
    title="Recover account"
  >
    <guide
      fill="primary"
      icon="½"
    >
      Recover<img :src="dizzySymbolEmoji">your
      <br><em>master account.</em>
      <br>You will need your
      <br><strong>recovery phrase</strong>, that
      <br>you have written down
      <br>during the setup.
    </guide>

    <form
      :id="_uid"
      @submit.prevent="setSeed"
    >
      <ae-input-mnemonic
        v-model="seed"
        v-validate="'required|mnemonic'"
        autofocus
        :error="errors.has('seed')"
        :footer="errors.first('seed')"
        name="seed"
      />
    </form>

    <ae-button
      slot="footer"
      :disabled="errors.any()"
      :form="_uid"
      fill="secondary"
    >
      Recover with Passphrase
    </ae-button>
  </mobile-page>
</template>

<script>
import { mapState } from 'vuex';
import dizzySymbolEmojiPath from 'emoji-datasource-apple/img/apple/64/1f4ab.png';
import MobilePage from '../components/MobilePage.vue';
import Guide from '../components/Guide.vue';
import AeButton from '../components/AeButton.vue';
import AeInputMnemonic from '../components/AeInputMnemonic.vue';

export default {
  components: {
    MobilePage, Guide, AeButton, AeInputMnemonic,
  },
  data() {
    return {
      dizzySymbolEmoji: dizzySymbolEmojiPath,
      seed: '',
      error: false,
    };
  },
  computed: mapState(['keystore']),
  methods: {
    async setSeed() {
      if (!await this.$validator.validateAll()) return;

      this.$router.push({ name: 'set-password', params: { seed: this.seed } });
    },
  },
};
</script>
