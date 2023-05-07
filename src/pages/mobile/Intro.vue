<template>
  <Page
    class="intro"
    fill="primary"
    hide-tab-bar
  >
    <Guide
      :template="$t('intro.guide')"
      fill="neutral"
    />

    <template slot="footer">
      <AeButton
        :to="{ name: encryptedWallet ? 'login' : 'recover' }"
        fill="secondary"
      >
        {{ encryptedWallet ? $t('intro.login') : $t('intro.recover') }}
      </AeButton>
      <AeButton
        fill="light"
        plain
        @click="() => createWallet()"
      >
        {{ $t('intro.create-account') }}
      </AeButton>
      <hr>
      <AeButton
        :to="{ name: 'onboarding' }"
        fill="light"
        plain
      >
        {{ $t('intro.onboarding') }}
      </AeButton>
    </template>
  </Page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Page from '../../components/Page.vue';
import Guide from '../../components/Guide.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: { Page, AeButton, Guide },
  computed: mapState('accounts/hdWallet', ['encryptedWallet']),
  methods: mapActions('accounts/hdWallet', ['createWallet']),
};
</script>

<style lang="scss" scoped>
@use '../../styles/variables';
@use '../../styles/functions';

.intro.page {
  padding-bottom: env(safe-area-inset-bottom);

  hr {
    margin: 0 functions.rem(-16px);
    height: 2px;
    border: none;
    background-color: variables.$color-primary-negative-1;
  }

  .ae-button.medium.plain:last-child {
    margin-bottom: 0;
  }
}
</style>
