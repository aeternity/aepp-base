<template>
  <AeModal
    class="modal"
    @close="$emit('close')"
  >
    <header>
      <slot
        v-if="$slots.logo"
        name="logo"
      />
      <div v-else />
      {{ title }}
      <div>
        <ButtonPlain
          v-if="closable"
          @click="$emit('close')"
        >
          <Close />
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
import AeModal from '../AeModal.vue';
import ButtonPlain from '../ButtonPlain.vue';
import { Close } from '../icons';

export default {
  components: {
    AeModal,
    ButtonPlain,
    Close,
  },
  props: {
    title: { type: String, required: true },
    closable: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/typography';

.modal {
  ::v-deep .modal-plain {
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

    > :first-child {
      height: rem(24px);
    }

    .button-plain .icon {
      height: rem(22px);
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
