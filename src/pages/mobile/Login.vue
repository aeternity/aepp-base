<template>
  <Page :right-button-to="{ name: 'intro' }" right-button-icon-name="close" hide-tab-bar>
    <Guide :template="$t('login.guide')">
      <img slot="wavingHandEmoji" :src="wavingHandEmoji" />
    </Guide>

    <form :id="_uid" @submit.prevent="unlockHdWallet">
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
            {{ $t('login.try-again-or') }}
            <RouterLink :to="{ name: 'recover' }">
              {{ $t('recover.button').toLowerCase() }}
            </RouterLink>
          </template>
          <RouterLink v-else :to="{ name: 'recover' }">
            {{ $t('recover.button') }}
          </RouterLink>
        </template>
      </AeInputPassword>
    </form>

    <AeButton slot="footer" :disabled="errors.any() || wrongPassword" :form="_uid" fill="secondary">
      {{ $t('login.button') }}
    </AeButton>
  </Page>
</template>

<script>
import wavingHandEmoji from 'emoji-datasource-apple/img/apple/64/1f44b.png';
import Page from '../../components/Page.vue';
import Guide from '../../components/Guide.vue';
import AeButton from '../../components/AeButton.vue';
import PasswordPurpose from '../../components/mobile/PasswordPurpose.vue';
import AeInputPassword from '../../components/AeInputPassword.vue';

export default {
  components: {
    Page,
    PasswordPurpose,
    AeInputPassword,
    AeButton,
    Guide,
  },
  data() {
    return {
      wavingHandEmoji,
      password: '',
      wrongPassword: false,
    };
  },
  methods: {
    async unlockHdWallet() {
      if (!(await this.$validator.validateAll())) return;

      try {
        await this.$store.dispatch('accounts/hdWallet/unlockWallet', this.password);
      } catch (e) {
        this.wrongPassword = true;
      }
    },
  },
};
</script>
