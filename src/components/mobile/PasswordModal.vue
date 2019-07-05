<template>
  <MobilePage
    hide-tab-bar
    right-button-icon-name="close"
    @right-button-click="cancelHandler"
  >
    <Guide>
      {{ $t('settings.password.modal.guide') }}
    </Guide>

    <form
      :id="_uid"
      @submit.prevent="continueHandler"
    >
      <PasswordPurpose />
      <AeInputPassword
        v-model="password"
        v-validate="'required|min:4'"
        autofocus
        autocomplete="current-password"
        :error="errors.has('password') || wrongPassword"
        name="password"
        @input="wrongPassword = false"
      >
        <template slot="footer">
          <template v-if="errors.has('password')">
            {{ errors.first('password') }}
          </template>
          <template v-else-if="wrongPassword">
            {{ $t('settings.password.wrong-password') }}
          </template>
        </template>
      </AeInputPassword>
    </form>

    <AeButton
      slot="footer"
      :disabled="errors.any() || wrongPassword"
      :form="_uid"
      fill="secondary"
    >
      {{ $t('settings.password.modal.continue') }}
    </AeButton>
  </MobilePage>
</template>

<script>
import MobilePage from './Page.vue';
import Guide from '../Guide.vue';
import AeButton from '../AeButton.vue';
import PasswordPurpose from './PasswordPurpose.vue';
import AeInputPassword from '../AeInputPassword.vue';

export default {
  components: {
    MobilePage, PasswordPurpose, AeInputPassword, AeButton, Guide,
  },
  props: {
    resolve: { type: Function, required: true },
    reject: { type: Function, required: true },
  },
  data: () => ({
    password: '',
    wrongPassword: false,
  }),
  methods: {
    async continueHandler() {
      if (!await this.$validator.validateAll()) return;

      try {
        await this.$store.dispatch('accounts/hdWallet/deriveAndCheckPasswordKey', this.password);
        this.resolve();
      } catch (e) {
        this.wrongPassword = true;
      }
    },
    cancelHandler() {
      this.reject(new Error('Cancelled by user'));
    },
  },
};
</script>
