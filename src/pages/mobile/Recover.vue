<template>
  <Page
    :right-button-to="{ name: 'intro' }"
    right-button-icon-name="close"
    :title="$t('recover.title')"
    hide-tab-bar
  >
    <Guide :template="$t('recover.guide')">
      <img slot="dizzySymbolEmoji" :src="dizzySymbolEmoji" />
    </Guide>

    <form :id="_uid" @submit.prevent="setMnemonic">
      <AeInputMnemonic
        v-model="mnemonic"
        v-validate="'required|mnemonic'"
        autofocus
        :error="errors.has('mnemonic')"
        :footer="errors.first('mnemonic')"
        name="mnemonic"
      />
    </form>

    <AeButton slot="footer" :disabled="errors.any()" :form="_uid" fill="secondary">
      {{ $t('recover.button') }}
    </AeButton>
  </Page>
</template>

<script>
import RecoverMixin from '../RecoverMixin';
import Page from '../../components/Page.vue';
import Guide from '../../components/Guide.vue';
import AeButton from '../../components/AeButton.vue';
import AeInputMnemonic from '../../components/AeInputMnemonic.vue';

export default {
  components: {
    Page,
    Guide,
    AeButton,
    AeInputMnemonic,
  },
  mixins: [RecoverMixin],
};
</script>
