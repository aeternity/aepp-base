<template>
  <div class="footer-modal">
    <transition name="fade">
      <ae-overlay v-if="$slots.default" @click="$emit('toggle')" />
    </transition>
    <div class="modal">
      <div class="quick-id">
        <div class="chevron">
          <ae-icon
            v-if="closable"
            name="chevron"
            :rotate="$slots.default ? 90 : -90"
            @click.native="$emit('toggle')"
          />
        </div>
        <template v-if="!$slots.default">
          <ae-identity-light :identity="identity" collapsed />
          <router-link
            :to="{ name: 'apps' }"
            class="back"
            slot="header-left"
            v-if="showBackButton"
            @click.native.stop
          />
        </template>
      </div>

      <transition name="scroll">
        <div class="content" v-if="$slots.default">
          <slot />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { AeIdentity, AeIcon, AeOverlay, AeIdentityLight } from '@aeternity/aepp-components'

  export default {
    components: { AeIdentity, AeIcon, AeOverlay, AeIdentityLight },
    computed: mapGetters({
      identity: 'activeIdentity'
    }),
    props: {
      'show-back-button': Boolean,
      closable: Boolean
    }
  }
</script>

<style scoped lang="scss">
  @import '~@aeternity/aepp-components/dist/variables.scss';

  .footer-modal {
    .ae-overlay {
      background: rgba($black, .6);

      &.fade-enter-active, &.fade-leave-active {
        transition: opacity .5s;
      }
      &.fade-enter, &.fade-leave-to {
        opacity: 0;
      }
    }

    .modal {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      border-top: 2px solid #f0f0f0;
      background-color: $white;

      .quick-id {
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: space-between;

        .chevron {
          position: absolute;
          width: 100%;
          display: flex;

          .ae-icon {
            margin: auto;
            cursor: pointer;
          }
        }

        .back, .ae-identity-light {
          z-index: 1;
          margin: 0 40px;
        }

        .back {
          width: 25px;
          height: 25px;
          background: url('/static/icons/grid-black.svg') no-repeat;
          background-size: contain;
        }
      }

      .content {
        height: 450px;
        margin: 0 40px;
        overflow: auto;

        &.scroll-enter-active, &.scroll-leave-active {
          transition: height .5s;
        }
        &.scroll-enter, &.scroll-leave-to {
          height: 0;
        }
      }
    }
  }
</style>
