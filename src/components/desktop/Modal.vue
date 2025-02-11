<template>
  <AeModal class="modal" @close="$emit('close')">
    <header>
      <slot v-if="$slots.logo" name="logo" />
      <div v-else />
      {{ title }}
      <div>
        <ButtonPlain v-if="closable" @click="$emit('close')">
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
@use '../../styles/variables';
@use '../../styles/functions';
@use '../../styles/typography';

.modal {
  ::v-deep .modal-plain {
    display: flex;
    flex-direction: column;
    width: functions.rem(560px);
    height: functions.rem(500px);
  }

  header {
    display: flex;
    justify-content: space-between;
    padding: functions.rem(25px) functions.rem(30px);
    background-color: variables.$color-neutral-positive-2;
    @extend %face-sans-base;
    font-weight: 500;

    * {
      width: functions.rem(24px);
    }

    > :first-child {
      height: functions.rem(24px);
    }

    .button-plain .icon {
      height: functions.rem(22px);
    }
  }

  main {
    flex-grow: 1;
  }

  footer {
    margin: functions.rem(25px) functions.rem(30px);
  }
}
</style>
