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
        :id="_uid.toString()"
        v-model="password"
        :error="error"
        label="New password"
        name="password"
        type="password"
        placeholder="Password"
        @click.native="error = false"
      />
      <ae-input
        v-validate="'confirmed:'+password"
        v-focus="true"
        :id="_uid.toString()"
        v-model="password"
        :error="error"
        label="Confirm new password"
        name="passwordRepeat"
        type="password"
        placeholder="Password"
        @click.native="error = false"
      />
      <!-- <ae-label
        :for="`${_uid}-password`"
        :help-text="errors.first('password')"
        help-type="dramatic"
      >Enter your password</ae-label>
      <ae-input
        v-validate="'required|min:4'"
        v-focus="true"
        :id="`${_uid}-password`"
        v-model="password"
        name="password"
        type="password"
      />
      <ae-label
        :for="`${_uid}-passwordRepeat`"
        :help-text="errors.first('passwordRepeat')"
        help-type="dramatic"
      >Confirm your password</ae-label>
      <ae-input
        v-validate="'confirmed:'+password"
        :id="`${_uid}-passwordRepeat`"
        name="passwordRepeat"
        type="password"
      /> -->
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
import { AeInput } from '@aeternity/aepp-components-3';
import clappingHandsEmojiPath from 'emoji-datasource-apple/img/apple/64/1f44f.png';
import keyEmojiPath from 'emoji-datasource-apple/img/apple/64/1f511.png';
import MobilePage from '../components/MobilePage.vue';
import Guide from '../components/Guide.vue';
import AeButton from '../components/AeButton.vue';

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
      error: false,
    };
  },
  computed: mapState(['keystore']),
  methods: {
    async createKeystore() {
      if (!await this.$validator.validateAll()) {
        this.error = true;
        return;
      }

      this.working = true;
      try {
        await this.$store.dispatch('createKeystore', {
          password: this.password,
          seed: this.seed,
        });
        this.$store.dispatch('setNotification', {
          text: `You successfully ${this.recover ? 'recovered your' : 'created new'} account`,
          icon: clappingHandsEmojiPath,
          autoClose: true,
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
  }
}
</style>
<style lang="scss" src="../components/MobilePageContent.scss" scoped />
<style lang="scss" src="./Intro.scss" scoped />
