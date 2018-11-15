<template>
  <mobile-page
    :redirect-to-on-close="{ name: recover ? 'recover' : 'new-account' }"
    class="set-password"
    title="New Account"
  >
    <guide
      fill="primary"
      icon="½"
    >
      You confirmed your
      <br>phrase correctly! Now
      <br><mark>choose a<img :src="keyEmoji">password</mark>
      <br>and confirm.
    </guide>

    <form @submit.prevent="createKeystore">
      <ae-input
        v-validate="'required|min:4'"
        v-focus="true"
        :id="`${_uid}-password`"
        v-model="password"
        :error="errors.first('password')"
        label="New password"
        name="password"
        type="password"
        placeholder="Password"
        @click.native="error = false"
      />
      <ae-input
        v-validate="'confirmed:'+password+'|required'"
        v-focus="true"
        :id="`${_uid}-passwordRepeat`"
        v-model="passwordRepeat"
        :error="errors.first('passwordRepeat')"
        label="Confirm new password"
        name="passwordRepeat"
        type="password"
        placeholder="Password"
        @click.native="error = false"
      />
    </form>
    <template slot="footer">
      <ae-button
        :disabled="errors.any() || working"
        fill="secondary"
        @click="createKeystore"
      >
        Confirm
      </ae-button>
    </template>
  </mobile-page>
</template>

<script>
import { mapState } from 'vuex';
import keyEmojiPath from 'emoji-datasource-apple/img/apple/64/1f511.png';
import MobilePage from '../components/MobilePage.vue';
import Guide from '../components/Guide.vue';
import AeButton from '../components/AeButton.vue';
import AeInput from '../components/AeInput.vue';

export default {
  components: {
    MobilePage, AeInput, AeButton, Guide,
  },
  props: {
    seed: { type: String, required: true },
  },
  data() {
    return {
      password: '',
      passwordRepeat: '',
      working: false,
      recover: false,
      keyEmoji: keyEmojiPath,
    };
  },
  computed: mapState(['keystore']),
  methods: {
    async createKeystore() {
      if (!await this.$validator.validateAll()) return;

      this.working = true;
      try {
        await this.$store.dispatch('createKeystore', {
          password: this.password,
          seed: this.seed,
        });
      } finally {
        this.working = false;
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.recover = from.name === 'recover'; // eslint-disable-line no-param-reassign
    });
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors';

.set-password {
  form {
    margin: 0 rem(-15px);
  }

  /deep/ .ae-input-container {
    margin-top: rem(15px);

    input {
      margin: 0;
    }
  }
}
</style>
<style lang="scss" src="../components/MobilePageContent.scss" scoped />
<style lang="scss" src="./FixedHeader.scss" scoped />
