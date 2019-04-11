<template>
  <MobilePage
    :right-button-to="{ name: 'intro' }"
    right-button-icon-name="close"
    title="Recover Account"
  >
    <Guide>
      <AeFraction
        slot="icon"
        numerator="1"
        denominator="2"
      />
      Enter <img :src="dizzySymbolEmoji"> your
      <strong>recovery phrase</strong>.
      The one you wrote
      down during <mark>account creation</mark>.
    </Guide>

    <form
      :id="_uid"
      @submit.prevent="setSeed"
    >
      <AeInputMnemonic
        v-model="seed"
        v-validate="'required|mnemonic'"
        autofocus
        :error="errors.has('seed')"
        :footer="errors.first('seed')"
        name="seed"
      />
    </form>

    <AeButton
      slot="footer"
      :disabled="errors.any()"
      :form="_uid"
      fill="secondary"
    >
      Recover account
    </AeButton>
  </MobilePage>
</template>

<script>
import { mapState } from 'vuex';
import dizzySymbolEmoji from 'emoji-datasource-apple/img/apple/64/1f4ab.png';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeFraction from '../../components/AeFraction.vue';
import AeButton from '../../components/AeButton.vue';
import AeInputMnemonic from '../../components/AeInputMnemonic.vue';

export default {
  components: {
    MobilePage, Guide, AeFraction, AeButton, AeInputMnemonic,
  },
  data() {
    return {
      dizzySymbolEmoji,
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
