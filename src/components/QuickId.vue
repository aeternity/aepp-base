<template>
  <ae-identity class="quick-id" :identity="identity" active @click="showIdManager" collapsed>
    <router-link
      :to="{ name: 'apps' }"
      class="back"
      slot="header-left"
      v-if="showBackButton"
      @click.native.stop
    />
  </ae-identity>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { AeIdentity, AeIcon } from '@aeternity/aepp-components'

  export default {
    name: 'quick-id',
    components: { AeIdentity, AeIcon },
    computed: mapGetters({
      identity: 'activeIdentity'
    }),
    props: {
      'show-back-button': Boolean
    },
    methods: {
      showIdManager () {
        this.$router.push({ name: 'accounts' })
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

    .back {
      width: 25px;
      height: auto;
      background: url('/static/icons/grid.svg') no-repeat;
      background-size: contain;
      border-right: 2px solid #f1f4f7;
      margin-right: 15px;
      padding-right: 15px;
    }
  }
</style>
