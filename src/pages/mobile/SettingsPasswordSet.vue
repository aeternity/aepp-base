<template>
  <MobilePage
    :title="$t('settings.password.title')"
    :right-button-to="{ name: 'settings-password' }"
    right-button-icon-name="close"
    hide-tab-bar
  >
    <Guide
      :template="isWalletEncrypted
        ? $t('settings.password.set.change-guide')
        : $t('settings.password.set.choose-guide')"
    >
      <img
        slot="keyEmoji"
        :src="keyEmoji"
      >
    </Guide>

    <form
      :id="_uid"
      @submit.prevent="createHdWallet"
    >
      <PasswordPurpose />
      <AeInputPassword
        v-if="isWalletEncrypted"
        v-model="password"
        v-validate="'required|min:4'"
        :autofocus="isWalletEncrypted"
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
      <AeInputPassword
        v-model="newPassword"
        v-validate="'required|min:4'"
        :autofocus="!isWalletEncrypted"
        autocomplete="password-new"
        :error="errors.has('newPassword')"
        :footer="errors.first('newPassword')"
        :header="$t('settings.password.set.password-new')"
        name="newPassword"
        hide-reveal-button
      />
      <AeInputPassword
        v-model="newPasswordConfirm"
        v-validate="`required|confirmed:${newPassword}`"
        autocomplete="password-new"
        :error="errors.has('newPasswordConfirm')"
        :footer="errors.first('newPasswordConfirm')"
        :header="$t('settings.password.set.password-new-confirm')"
        name="newPasswordConfirm"
        hide-reveal-button
      />
    </form>

    <AeButton
      slot="footer"
      :form="_uid"
      :disabled="errors.any() || wrongPassword"
      fill="secondary"
    >
      {{ $t('confirm') }}
    </AeButton>
  </MobilePage>
</template>

<script>
import { mapGetters } from 'vuex';
import keyEmoji from 'emoji-datasource-apple/img/apple/64/1f511.png';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import PasswordPurpose from '../../components/mobile/PasswordPurpose.vue';
import AeInputPassword from '../../components/AeInputPassword.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    MobilePage, Guide, PasswordPurpose, AeInputPassword, AeButton,
  },
  data: () => ({
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
    wrongPassword: false,
    keyEmoji,
  }),
  computed: mapGetters('accounts/hdWallet', ['isWalletEncrypted']),
  methods: {
    async createHdWallet() {
      if (!await this.$validator.validateAll()) return;

      try {
        await this.$store.dispatch('accounts/hdWallet/changeWalletPassword', {
          password: this.password,
          newPassword: this.newPassword,
        });
        this.$router.push({ name: 'settings-password' });
      } catch (e) {
        this.wrongPassword = true;
      }
    },
  },
};
</script>
