<template>
  <ae-main
    id="app"
    :class="{ 'quick-id-hidden': !$route.meta.displayFooter }">
    <router-view />
    <ae-banner v-if="notification">
      <img
        v-if="notification.icon"
        :src="notification.icon" >
      {{ notification.text }}
      <ae-button
        v-if="notification.action"
        slot="right"
        plain
        uppercase
        type="exciting"
        size="small"
        @click="notification.action.handler"
      >
        {{ notification.action.name }}
      </ae-button>
    </ae-banner>
    <app-footer
      v-if="$route.meta.displayFooter"
      :show-back-button="$route.name !== 'apps'"
    />
    <remove-app-modal />
    <alert-modal />
  </ae-main>
</template>

<script>
import { mapState } from 'vuex';
import { AeMain, AeBanner, AeButton } from '@aeternity/aepp-components';
import FooterMobile from './components/FooterMobile.vue';
import FooterDesktop from './components/FooterDesktop.vue';
import RemoveAppModal from './components/RemoveAppModal.vue';
import AlertModal from './components/AlertModal.vue';

export default {
  components: {
    AeMain,
    AeBanner,
    AeButton,
    RemoveAppModal,
    AlertModal,
    AppFooter: process.env.IS_MOBILE_DEVICE ? FooterMobile : FooterDesktop,
  },
  computed: mapState(['notification']),
  created() {
    // set domain to base host because of iframe cross domain policy, very nice hardcoded urls
    if (document.domain.includes('aepps.com')) {
      document.domain = 'aepps.com';
    } else if (document.domain.includes('aepps.dev')) {
      document.domain = 'aepps.dev';
    }
  },
};
</script>

<style scoped lang="scss">
@import '~@aeternity/aepp-components-3/src/styles/variables/colors';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
  background: $color-neutral-maximum;

  &.quick-id-hidden {
    padding-bottom: 0;
  }

  .ae-banner {
    position: fixed;
    left: 0;
    right: 0;
    z-index: auto;

    img {
      height: 22px;
      margin-right: 4px;
      vertical-align: text-bottom;
    }
  }
}
</style>
