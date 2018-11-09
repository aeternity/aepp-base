<template>
  <div class="mobile-page">
    <div class="panel">
      <div :class="['top', !this.$slots['content-bottom'] && 'only']">
        <header-mobile>
          {{ title }}
          <ae-button
            v-if="backButton || closeButton || addButton"
            :slot="backButton ? 'left' : 'right'"
            size="small"
            plain
            @click="closeHandler"
          >
            <ae-icon
              slot="icon"
              :name="backButton ? 'back' : closeButton ? 'close' : 'plus'"
              :rotate="backButton ? 180 : 0"
              size="20px"
            />
          </ae-button>
        </header-mobile>
        <div class="content">
          <slot />
        </div>
      </div>
      <div
        v-if="!!this.$slots['content-bottom']"
        class="bottom"
      >
        <div class="content">
          <slot name="content-bottom" />
        </div>
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
import { AeIcon } from '@aeternity/aepp-components-3';
import HeaderMobile from './HeaderMobile.vue';
import AeButton from '../components/AeButton.vue';

export default {
  components: { AeButton, AeIcon, HeaderMobile },
  props: {
    title: { type: String, default: '' },
    redirectToOnClose: { type: Object, default: undefined },
    backButton: { type: Boolean, default: false },
    closeButton: { type: Boolean, default: false },
    addButton: { type: Boolean, default: false },
  },
  methods: {
    closeHandler() {
      this.$emit('close');
      if (this.addButton) {
        this.$router.push({ name: 'accounts-new' });
        return;
      }
      if (!this.redirectToOnClose) return;
      this.$router.push(this.redirectToOnClose);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components/dist/mixins.scss';
@import '~@aeternity/aepp-components-3/src/styles/globals/functions';

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

  > .panel, .top, .bottom {
    display: flex;
    flex-direction: column;
  }

  > .panel {
    position: relative;

    @include phone {
      flex-grow: 1;
    }

    @include abovePhone {
      background: linear-gradient(to bottom, white, #f1f4f7);
      border-radius: rem(10px);
      margin: auto;
      width: $screen-phone - 2 * $overlay-padding;
      min-height: rem(600px);
    }

    .top.only {
      flex-grow: 1;
    }

    .bottom {
      margin-top: -2rem;
      margin-bottom: rem(60px);
    }

    .content {
      flex-grow: 1;
      margin: 0 rem(30px);
    }

    .footer {
      margin: rem(32px);
    }
  }
}
</style>
