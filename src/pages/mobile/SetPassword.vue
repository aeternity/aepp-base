<template>
  <MobilePage
    :title="recover ? 'Recover Account' : 'New Account'"
    hide-tab-bar
  >
    <Guide>
      <AeFraction
        slot="icon"
        :numerator="recover ? 2 : 4"
        :denominator="recover ? 2 : 4"
      />

      <template v-if="recover">
        You recovered your
        account <em>successfully</em>!
        Now <mark>choose a new <img :src="keyEmoji"> password</mark>
        and confirm.
      </template>
      <template v-else>
        Great, that's done. Now
        create <mark>your <img :src="keyEmoji"> password</mark>
      </template>
    </Guide>

    <form
      :id="_uid"
      @submit.prevent="createHdWallet"
    >
      <PasswordPurpose />
      <AeInputPassword
        v-model="password"
        v-validate="'required|min:4'"
        autofocus
        autocomplete="new-password"
        :error="errors.has('password')"
        :footer="errors.first('password')"
        name="password"
        hide-reveal-button
      />
      <AeInputPassword
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

    <AeButton
      slot="footer"
      :form="_uid"
      :disabled="errors.any() || working"
      fill="secondary"
    >
      Confirm
    </AeButton>
  </MobilePage>
</template>

<script>
import keyEmoji from 'emoji-datasource-apple/img/apple/64/1f511.png';
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
    mnemonic: { type: String, required: true },
  },
  data() {
    return {
      password: '',
      passwordConfirm: '',
      recover: false,
      working: false,
      keyEmoji,
    };
  },
  methods: {
    async createHdWallet() {
      if (!await this.$validator.validateAll()) return;

      this.working = true;
      try {
        await this.$store.dispatch('accounts/hdWallet/createWallet', {
          password: this.password,
          mnemonic: this.mnemonic,
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
