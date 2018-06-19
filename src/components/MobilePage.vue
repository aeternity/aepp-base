<template>
  <div class="mobile-page">
    <div class="panel">
      <header-mobile>
        {{ title }}
        <ae-button
          v-if="backButton || closeButton"
          :slot="backButton ? 'left' : 'right'"
          plain
          size="small"
          @click="closeHandler"
        >
          <ae-icon
            slot="icon"
            :name="backButton ? 'arrow' : 'close'"
            :rotate="backButton ? 180 : 0"
          />
        </ae-button>
      </header-mobile>
      <div class="content">
        <slot />
      </div>
      <div
        v-if="$slots.footer"
        class="footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
import { AeButton, AeIcon } from '@aeternity/aepp-components'
import HeaderMobile from './HeaderMobile'

export default {
  components: { AeButton, AeIcon, HeaderMobile },
  props: {
    title: { type: String, default: '' },
    redirectToOnClose: { type: Object, default: undefined },
    backButton: { type: Boolean, default: false },
    closeButton: { type: Boolean, default: false }
  },
  methods: {
    closeHandler () {
      this.$emit('close')
      if (!this.redirectToOnClose) return
      this.$router.push(this.redirectToOnClose)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@aeternity/aepp-components/dist/variables.scss";
@import "~@aeternity/aepp-components/dist/mixins.scss";

.mobile-page {
  $overlay-padding: 10px;

  flex-grow: 1;
  display: flex;

  @include phone {
    flex-direction: column;
  }

  @include abovePhone {
    background: $smoke;
    padding: $overlay-padding;
    box-sizing: border-box;
  }

  > .panel {
    display: flex;
    flex-direction: column;

    @include phone {
      flex-grow: 1;
    }

    @include abovePhone {
      background: linear-gradient(to bottom, white, #f1f4f7);
      border-radius: 10px;
      margin: auto;
      min-width: $screen-phone - 2 * $overlay-padding;
      min-height: 600px;
    }

    > .content {
      flex-grow: 1;
    }

    > .content, > .footer {
      margin: 0 20px 20px 20px;
    }
  }
}
</style>
