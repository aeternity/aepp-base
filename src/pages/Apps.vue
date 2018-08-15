<template>
  <div class="apps">
    <header-mobile>Browse æpps</header-mobile>
    <header-desktop>
      <ae-button
        :to="{ name: 'add-app' }"
        type="dramatic">
        <ae-icon
          slot="icon"
          name="plus"
          invert
          type="exciting" />
      </ae-button>
    </header-desktop>

    <div class="shortcuts">
      <div
        v-for="(app, index) in apps"
        :key="index"
        class="app-shortcut"
        @touchstart="editMode"
        @touchend="editMode('cancel')"
        @contextmenu.prevent
      >
        <div class="app-icon-wrapper">
          <ae-button
            v-if="loggedIn && !app.unremovable"
            :class="{ visible: editModeActive }"
            class="remove-app-btn"
            type="dramatic"
            size="small"
            @click="selectAppToRemove(index)"
          >
            <ae-icon
              slot="icon"
              invert
              type="exciting"
              name="close" />
          </ae-button>
          <router-link :to="app.path">
            <ae-app-icon
              :src="app.icon"
              :full-size="app.iconFullSize" />
          </router-link>
        </div>
        <router-link
          :to="app.path"
          class="app-name">
          {{ app.name }}
        </router-link>
      </div>

      <router-link
        :to="{ name: 'add-app' }"
        class="app-shortcut add-app">
        <ae-app-icon :src="require('../assets/icons/plus.svg')" />
        <div class="app-name">Add an æpp</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { AeAppIcon, AeButton, AeIcon, AeNotification, AeModalLight } from '@aeternity/aepp-components'
import { DEFAULT_ICON, appsRegistry } from '../lib/appsRegistry'
import HeaderDesktop from '../components/HeaderDesktop'
import HeaderMobile from '../components/HeaderMobile'

export default {
  components: {
    AeAppIcon,
    AeIcon,
    AeButton,
    AeNotification,
    AeModalLight,
    HeaderDesktop,
    HeaderMobile
  },
  data () {
    return {
      editModeActive: false,
      editModeTmOut: null
    }
  },
  computed: {
    ...mapState({
      apps: state => state.apps.map(app => ({
        icon: DEFAULT_ICON,
        ...app,
        ...appsRegistry[app]
      }))
    }),
    ...mapGetters(['loggedIn'])
  },
  watch: {
    editModeActive (active) {
      this.setNotification(active)
    }
  },
  beforeDestroy () {
    if (!this.editModeActive) return
    this.setNotification(false)
  },
  methods: {
    ...mapMutations(['selectAppToRemove']),
    editMode (action = null) {
      if (!this.loggedIn) return
      if (action === 'cancel') return clearTimeout(this.editModeTmOut)
      this.editModeTmOut = setTimeout(() => { this.editModeActive = true }, 1000)
    },
    setNotification (visible) {
      this.$store.commit('setNotification', visible && ({
        text: 'You\'re now removing æpps',
        action: {
          name: 'Cancel',
          handler: () => {
            this.editModeActive = false
          }
        }
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@aeternity/aepp-components/dist/mixins";

.apps {
  @include abovePhone {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 30px 0 80px 0;
    overflow-y: auto;
  }

  .header-mobile {
    @include abovePhone {
      display: none;
    }
  }

  .header-desktop {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;

    @include phone {
      display: none;
    }

    .ae-button .ae-icon {
      width: 24px;
      height: 24px;
      margin: 13px;
    }
  }

  .shortcuts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
    margin: 50px 10px 10px 10px;
    grid-gap: 30px 10px;
    justify-items: center;

    @include abovePhone {
      grid-gap: #{100 / 1024 * 100vh} #{114 / 1440 * 100vw};
      margin: auto #{270 / 1440 * 100vw};
    }

    .app-shortcut {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      .app-icon-wrapper {
        position: relative;

        @mixin remove-app-btn-hidden {
          visibility: hidden;
          opacity: 0;
          transform: translate(48%, -50%) scale(.45, .45);
          transition: opacity 300ms, transform 300ms, visibility 0s 300ms;
        }

        .remove-app-btn {
          position: absolute;
          top: 0;
          right: 0;
          cursor: pointer;
          @include remove-app-btn-hidden;
        }

        &:hover .remove-app-btn, .remove-app-btn.visible {
          visibility: visible;
          opacity: 1;
          transform: translate(48%, -50%) scale(.58, .58);
          transition: opacity 300ms 500ms, transform 300ms 500ms, visibility 0s 500ms;
        }

        @media (hover: none) {
          .remove-app-btn:not(.visible) {
            @include remove-app-btn-hidden;
          }
        }

        .ae-app-icon {
          margin: 0 auto;
        }
      }

      .app-name {
        display: block;
        margin-top: 13px;
        font-size: 18px;
        font-weight: 500;
        text-align: center;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      @include abovePhone {
        &.add-app {
          display: none;
        }
      }
    }
  }
}
</style>
