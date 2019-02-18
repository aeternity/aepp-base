<template>
  <mobile-page
    :right-button-to="{ name: 'intro' }"
    right-button-icon-name="close"
  >
    <guide>
      <em>Hello!</em>{{ ' ' }}<img :src="wavingHandEmoji">
      {{ ' ' }}<mark>Log in</mark> to
      <br>æternity with your
      <br>password
    </guide>

    <form
      :id="_uid"
      @submit.prevent="unlockSavedKeystore"
    >
      <password-purpose />
      <ae-input-password
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
            Try again or
            <router-link :to="{ name: 'recover' }">
              recover account
            </router-link>
          </template>
          <template v-else>
            <router-link :to="{ name: 'recover' }">
              Recover account
            </router-link>
          </template>
        </template>
      </ae-input-password>
    </form>

    <ae-button
      slot="footer"
      :disabled="errors.any() || wrongPassword"
      :form="_uid"
      fill="secondary"
    >
      Log in
    </ae-button>
  </mobile-page>
</template>

<script>
import wavingHandEmojiPath from 'emoji-datasource-apple/img/apple/64/1f44b.png';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeButton from '../../components/AeButton.vue';
import PasswordPurpose from '../../components/mobile/PasswordPurpose.vue';
import AeInputPassword from '../../components/AeInputPassword.vue';

export default {
  components: {
    MobilePage, PasswordPurpose, AeInputPassword, AeButton, Guide,
  },
  data() {
    return {
      wavingHandEmoji: wavingHandEmojiPath,
      password: '',
      wrongPassword: false,
    };
  },
  methods: {
    async unlockSavedKeystore() {
      if (!await this.$validator.validateAll()) return;

      try {
        await this.$store.dispatch('unlockKeystore', this.password);
      } catch (e) {
        this.wrongPassword = true;
      }
    },
  },
};
</script>
