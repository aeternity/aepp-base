<template>
  <mobile-page
    :redirect-to-on-close="{ name: 'intro' }"
    title="Login to æternity"
    close-button>
    <form @submit.prevent="unlockSavedKeystore">
      <ae-label
        :for="_uid"
        :help-text="errors.first('password')"
        help-type="dramatic"
      >Enter your password</ae-label>
      <ae-input
        v-validate="'required|min:4'"
        v-focus="true"
        :id="_uid"
        v-model="password"
        name="password"
        type="password"
      />
      <ae-button
        :disabled="errors.any()"
        type="exciting"
      >Login</ae-button>
    </form>

    <template slot="footer">
      <p>
        Recover with phrase if you forgot your password or
        create a new account if you haven’t done that yet
      </p>
      <ae-button
        :to="{ name: 'recover' }"
        size="small"
        plain
        type="dramatic"
        uppercase>
        Recover with passphrase
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
import { AeLabel, AeInput, AeButton } from '@aeternity/aepp-components';
import lyingFaceEmojiPath from 'emoji-datasource-apple/img/apple/64/1f925.png';
import MobilePage from '../components/MobilePage.vue';

export default {
  components: {
    MobilePage, AeInput, AeLabel, AeButton,
  },
  data() {
    return { password: '' };
  },
  methods: {
    async unlockSavedKeystore() {
      if (!await this.$validator.validateAll()) return;
      try {
        await this.$store.dispatch('unlockKeystore', this.password);
      } catch (e) {
        if (e.message !== 'Invalid password') throw e;
        this.$store.dispatch('setNotification', {
          text: 'You\'ve entered a wrong password',
          icon: lyingFaceEmojiPath,
          autoClose: true,
        });
      }
    },
  },
};
</script>
<style lang="scss" src="../components/MobilePageContent.scss" scoped />
