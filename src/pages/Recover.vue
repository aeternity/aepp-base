<template>
  <mobile-page
    :redirect-to-on-close="{ name: 'intro' }"
    title="Recover account"
    class="recover"
    close-button
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

    <form @submit.prevent="setSeed">
      <ae-input-mnemonic
        v-model="seed"
        v-validate="'required|mnemonic'"
        autofocus
        :error="errors.has('seed')"
        :footer="errors.first('seed')"
        name="seed"
      />
    </form>

    <template slot="footer">
      <ae-button
        :disabled="errors.any()"
        fill="secondary"
        @click="setSeed"
      >
        Recover with Passphrase
      </ae-button>
    </template>
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

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';

.recover form {
  margin: 0 rem(-15px);
}
</style>
<style lang="scss" src="../components/MobilePageContent.scss" scoped />
<style lang="scss" src="./FixedHeader.scss" scoped />
