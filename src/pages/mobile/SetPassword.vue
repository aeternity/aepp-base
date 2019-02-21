<template>
  <mobile-page :title="recover ? 'Recover Account' : 'New Account'">
    <guide>
      <ae-fraction
        slot="icon"
        :numerator="recover ? 2 : 4"
        :denominator="recover ? 2 : 4"
      />

      <template v-if="recover">
        You recovered your
                      <br>account <em>successfully</em>!
                      <br>Now <mark>choose a new <img :src="keyEmoji"></mark>
                      <br><mark>password</mark> and confirm.
      </template>
      <template v-else>
        Great, that's done. Now
        <br>create <mark>your <img :src="keyEmoji"> password</mark>
      </template>
    </guide>

    <form
      :id="_uid"
      @submit.prevent="createKeystore"
    >
      <password-purpose />
      <ae-input-password
        v-model="password"
        v-validate="'required|min:4'"
        autofocus
        autocomplete="new-password"
        :error="errors.has('password')"
        :footer="errors.first('password')"
        name="password"
        hide-reveal-button
      />
      <ae-input-password
        v-model="passwordConfirm"
        v-validate="`required|confirmed:${password}`"
        autocomplete="new-password"
        :error="errors.has('passwordConfirm')"
        :footer="errors.first('passwordConfirm')"
        header="Repeat password"
        name="passwordConfirm"
        hide-reveal-button
      />
    </form>

    <ae-button
      slot="footer"
      :form="_uid"
      :disabled="errors.any() || working"
      fill="secondary"
    >
      Confirm
    </ae-button>
  </mobile-page>
</template>

<script>
import { mapState } from 'vuex';
import keyEmojiPath from 'emoji-datasource-apple/img/apple/64/1f511.png';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeFraction from '../../components/AeFraction.vue';
import AeButton from '../../components/AeButton.vue';
import PasswordPurpose from '../../components/mobile/PasswordPurpose.vue';
import AeInputPassword from '../../components/AeInputPassword.vue';

export default {
  components: {
    MobilePage, PasswordPurpose, AeInputPassword, AeButton, Guide, AeFraction,
  },
  props: {
    seed: { type: String, required: true },
  },
  data() {
    return {
      password: '',
      passwordConfirm: '',
      recover: false,
      working: false,
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
