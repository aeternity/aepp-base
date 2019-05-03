<template>
  <AeModal
    class="ledger-modal"
    @close="$emit('close')"
  >
    <header>
      <img
        class="logo"
        src="../../assets/ledger-logo.svg"
      >
      {{ title }}
      <div>
        <ButtonPlain
          v-if="closable"
          @click="$emit('close')"
        >
          <AeIcon name="close" />
        </ButtonPlain>
      </div>
    </header>

    <main>
      <slot />
    </main>

    <footer v-if="$slots.footer">
      <slot name="footer" />
    </footer>
  </AeModal>
</template>

<script>
import { AeIcon } from '@aeternity/aepp-components-3';
import AeModal from '../AeModal.vue';
import ButtonPlain from '../ButtonPlain.vue';

export default {
  components: {
    AeModal,
    ButtonPlain,
    AeIcon,
  },
  props: {
    title: { type: String, required: true },
    closable: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

.ledger-modal {
  /deep/ .modal-plain {
    display: flex;
    flex-direction: column;
    width: rem(560px);
    height: rem(500px);
  }

  header {
    display: flex;
    justify-content: space-between;
    padding: rem(25px) rem(30px);
    background-color: $color-neutral-positive-2;
    @extend %face-sans-base;
    font-weight: 500;

    * {
      width: rem(24px);
    }

    .logo {
      height: rem(24px);
    }

    .button-plain .ae-icon {
      font-size: rem(22px);
    }
  }

  main {
    flex-grow: 1;
  }

  footer {
    margin: rem(25px) rem(30px);
  }
}
</style>
