<template>
  <mobile-page
    :redirect-to-on-close="{ name: 'intro' }"
    class="login"
    close-button
  >
    <guide
      fill="primary"
    >
      <em>Hello!</em><img :src="wavingHandEmoji">
      <mark>Login</mark> to æternity
      <br>with password or <mark>recover</mark>
      <br><mark>your account</mark> with phrase
    </guide>

    <form @submit.prevent="unlockSavedKeystore">
      <ae-input-password
        v-model="password"
        v-validate="'required|min:4'"
        autofocus
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
              recover
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

    <template slot="footer">
      <ae-button
        :disabled="errors.any() || wrongPassword"
        fill="secondary"
        @click="unlockSavedKeystore"
      >
        Login
      </ae-button>
    </template>
  </mobile-page>
</template>

<script>
import wavingHandEmojiPath from 'emoji-datasource-apple/img/apple/64/1f44b.png';
import MobilePage from '../components/MobilePage.vue';
import Guide from '../components/Guide.vue';
import AeButton from '../components/AeButton.vue';
import AeInputPassword from '../components/AeInputPassword.vue';

export default {
  components: {
    MobilePage, AeInputPassword, AeButton, Guide,
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

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.login {
  .guide {
    margin-bottom: rem(19px);

    /deep/ div {
      margin: 0 auto;
    }
  }

  form {
    margin: 0 rem(-15px);
  }
}
</style>
<style lang="scss" src="../components/MobilePageContent.scss" scoped />
<style lang="scss" src="./FixedHeader.scss" scoped />
