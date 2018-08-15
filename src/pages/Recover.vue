<template>
  <mobile-page
    :redirect-to-on-close="{ name: 'intro' }"
    title="Recover with phrase"
    close-button>
    <form @submit.prevent="setSeed">
      <ae-label
        :for="_uid"
        :help-text="errors.first('seed')"
        help-type="dramatic"
      >Enter passphrase</ae-label>
      <ae-textarea
        v-validate="'required'"
        v-focus="true"
        :id="_uid"
        v-model="seed"
        name="seed"
        monospace
      />
      <ae-button
        :inactive="errors.any()"
        type="dramatic"
      >Recover with Passphrase</ae-button>
    </form>

    <template slot="footer">
      <p>
        Enter your password if you remember it again or
        create a new account if you haven’t done that yet
      </p>
      <ae-button
        v-if="keystore"
        :to="{ name: 'login' }"
        size="small"
        plain
        type="exciting"
        uppercase
      >
        Login with an existing account
      </ae-button>
      <ae-button
        :to="{ name: 'new-account' }"
        size="small"
        plain
        type="exciting"
        uppercase>
        Create new account
      </ae-button>
    </template>
  </mobile-page>
</template>

<script>
import { mapState } from 'vuex';
import { AeLabel, AeTextarea, AeButton } from '@aeternity/aepp-components';
import { validateMnemonic } from '@aeternity/bip39';
import MobilePage from '../components/MobilePage';

export default {
  components: {
    MobilePage, AeTextarea, AeLabel, AeButton,
  },
  data() {
    return { seed: '' };
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
<style lang="scss" src="../components/MobilePageContent.scss" scoped />
