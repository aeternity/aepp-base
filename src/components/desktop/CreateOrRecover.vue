<template>
  <div class="create-or-restore">
    <Guide :template="$t('recover.guide')">
      <img
        slot="dizzySymbolEmoji"
        :src="dizzySymbolEmoji"
      >
    </Guide>

    <form
      :id="_uid"
      @submit.prevent="setMnemonic"
    >
      <AeInputMnemonic
        v-model="mnemonic"
        v-validate="'required|mnemonic'"
        autofocus
        :error="errors.has('mnemonic')"
        :footer="errors.first('mnemonic')"
        name="mnemonic"
      />
    </form>

    <AeButton
      slot="footer"
      :disabled="errors.any()"
      :form="_uid"
      fill="secondary"
    >
      {{ $t('recover.button') }}
    </AeButton>

    <AeButton
      fill="primary"
      @click="() => createWallet()"
    >
      {{ $t('intro.create-account') }}
    </AeButton>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import RecoverMixin from '../../pages/RecoverMixin';
import AeButton from '../AeButton.vue';
import Guide from '../Guide.vue';
import AeInputMnemonic from '../AeInputMnemonic.vue';

export default {
  components: { AeButton, Guide, AeInputMnemonic },
  mixins: [RecoverMixin],
  computed: mapState('accounts/hdWallet', ['encryptedWallet']),
  methods: mapActions('accounts/hdWallet', ['createWallet']),
};
</script>

<style lang="scss" scoped>
@import '../../styles/functions';

.create-or-restore {
  margin: rem(40px) rem(40px);
}
</style>
