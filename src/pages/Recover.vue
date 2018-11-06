<template>
  <mobile-page
    :redirect-to-on-close="{ name: 'intro' }"
    title="Recover account"
    class="recover"
    close-button>
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
      <ae-textarea
        v-validate="'required'"
        v-focus="true"
        :id="_uid"
        v-model="seed"
        name="seed"
        placeholder="Recovery phrase"
        monospace
      />
    </form>

    <template slot="footer">
      <ae-button
        :disabled="errors.any()"
        type="secondary"
        size="medium"
        @click="setSeed"
      >
        Recover with Passphrase
      </ae-button>
    </template>
  </mobile-page>
</template>

<script>
import { mapState } from 'vuex';
import { AeLabel, AeTextarea } from '@aeternity/aepp-components';
import { AeInput } from '@aeternity/aepp-components-3';
import { validateMnemonic } from '@aeternity/bip39';
import dizzySymbolEmojiPath from 'emoji-datasource-apple/img/apple/64/1f4ab.png';
import MobilePage from '../components/MobilePage.vue';
import Guide from '../components/Guide.vue';
import AeButton from '../components/AeButton.vue';

export default {
  components: {
    MobilePage, AeTextarea, AeLabel, Guide, AeButton, AeInput,
  },
  data() {
    return {
      dizzySymbolEmoji: dizzySymbolEmojiPath,
      seed: '',
    };
  },
  computed: mapState(['keystore']),
  methods: {
    async setSeed() {
      if (!await this.$validator.validateAll()) return;

      if (validateMnemonic(this.seed)) {
        this.$router.push({ name: 'set-password', params: { seed: this.seed } });
      } else {
        this.$store.dispatch('setNotification', {
          text: 'Invalid passphrase',
          autoClose: true,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors';

.recover {
  form {
    margin: 0 rem(-15px);
  }

  .ae-textarea {
    @extend %face-sans-base;
    color: $color-neutral-negative-1;
    border: none;
    border-radius: 0;
    background-color: $color-neutral-positive-3;

    &:focus {
      border-left: 2px solid $color-focus;
    }

    .label {
      @extend %face-sans-xs;
    }
  }
}
</style>
<style lang="scss" src="../components/MobilePageContent.scss" scoped />
<style lang="scss" src="./Intro.scss" scoped />
