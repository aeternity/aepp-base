<template>
  <ae-textarea
    v-remove-spaces-on-copy
    :value="formattedValue"
    :label="label"
    :placeholder="placeholder"
    :error="error"
    class="ae-address-input"
    type="textarea"
    monospace
    @input="handleInput"
  >
    <template slot="footer">
      <ae-toolbar>
        <button-plain
          @click="readValueFromQrCode"
        >
          <ae-icon name="camera" />
          Scan
        </button-plain>

        <ae-identicon
          v-if="isValueValid"
          :address="value"
          size="s"
        />
        <span v-else-if="value.length">
          Invalid AE Address
        </span>
      </ae-toolbar>
    </template>
  </ae-textarea>
</template>

<script>
import { AeIdenticon, AeIcon, directives } from '@aeternity/aepp-components-3';
import { Crypto } from '@aeternity/aepp-sdk';
import AeTextarea from './AeTextarea.vue';
import AeToolbar from './AeToolbar.vue';
import ButtonPlain from './ButtonPlain.vue';

export default {
  directives: {
    removeSpacesOnCopy: directives.removeSpacesOnCopy,
  },
  components: {
    AeIdenticon, AeIcon, AeTextarea, AeToolbar, ButtonPlain,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    formattedValue() {
      return this.formatAddress(this.value);
    },
    isValueValid() {
      return Crypto.isAddressValid(this.value);
    },
  },
  methods: {
    handleInput() {
      const { textarea } = this.$children[0].$refs;
      const { selectionStart, value } = textarea;

      const address = this.formatAddress(value);
      if (address !== value) {
        textarea.value = address;
        const cursor = this.getNewCursor(value, selectionStart);
        const setSelection = () => textarea.setSelectionRange(cursor, cursor);
        setSelection();
        setTimeout(setSelection, 0);
      }
      this.$emit('input', address.replace(/[ \n]/g, ''));
    },
    formatAddress(address) {
      if (['', 'a', 'ak'].includes(address)) return address;

      let res = address
        .slice(address.startsWith('ak_') ? 3 : 0)
        .replace(/[^1-9A-HJ-NP-Za-km-z]/g, '');

      if (!res) return 'ak_';

      res = res
        .slice(0, 50)
        .match(/^.{2}(?!.{46}$)|.{1,3}/g)
        .join(' ');

      return `ak_ ${res}`;
    },
    getNewCursor(address, cursor) {
      return this.formatAddress(address.slice(0, cursor)).length;
    },
    async readValueFromQrCode() {
      this.$children[0].$refs.textarea.value = await this.$store
        .dispatch('readQrCode', 'Scan AE Address');
      this.handleInput();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.ae-address-input {
  .ae-toolbar {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;

    &, .button-plain {
      font-family: $font-sans;
      font-size: rem(11px);
      font-weight: 500;
      letter-spacing: rem(1.1px);
      text-transform: uppercase;
      color: $color-neutral-negative-1;
    }

    .button-plain {
      display: flex;
      align-items: center;

      .ae-icon {
        margin-right: rem(4px);
        font-size: rem(14px);
      }
    }
  }
}
</style>
