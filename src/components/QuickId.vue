<template>
  <ae-identity-background class="quick-id" type="dramatic" @click="showIdManager">
    <template v-if="showBackButton">
      <router-link
        :to="{ name: 'apps' }"
        @click.native.stop
        class="back-button"
        tag="button"
      />
      <div class="vertical-ruler" />
    </template>
    <ae-identity-light :identity="identity" active collapsed invert />
    <ae-icon name="chevron" rotate="270" type="dramatic" invert />
  </ae-identity-background>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { AeIdentityBackground, AeIdentityLight, AeIcon } from '@aeternity/aepp-components'

  export default {
    name: 'quick-id',
    components: { AeIdentityBackground, AeIdentityLight, AeIcon },
    computed: mapGetters({
      identity: 'activeIdentity'
    }),
    props: {
      'show-back-button': Boolean
    },
    methods: {
      showIdManager () {
        this.$store.commit('toggleIdManager')
      }
    }
  }
</script>

<style scoped lang="scss">
  .quick-id {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 40px);
    max-width: 350px;
    cursor: pointer;

    .back-button {
      width: 25px;
      height: auto;
      background: url('/static/icons/grid.svg') no-repeat;
      background-size: contain;
    }

    .vertical-ruler {
      margin: 0 15px;
      height: 25px;
      border-right: 1px solid #ffffff;
      align-self: center;
    }
  }
</style>
