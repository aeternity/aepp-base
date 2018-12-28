<script>
import { times, chunk } from 'lodash-es';
import { directives } from '@aeternity/aepp-components-3';

export default {
  directives: {
    copyToClipboard: directives.copyToClipboard,
    removeSpacesOnCopy: directives.removeSpacesOnCopy,
  },
  props: {
    address: {
      type: String,
      required: true,
    },
    length: {
      type: String,
      validator: value => ['full', 'medium', 'short'].includes(value),
      default: 'full',
    },
    splitBy: {
      type: [String, Number],
      default: 0,
    },
  },
  computed: {
    lines() {
      const chunks = this.address.match(/^\w{2}_|.{2}(?=.{47,48}$)|.{2,3}/g);
      if (this.length !== 'short' && chunks[1].length === 2) {
        chunks[1] = `\xa0${chunks[1]}`;
      }
      switch (this.length) {
        case 'full':
          return chunk(chunks, this.splitBy || chunks.length)
            .map(line => line.join(' '));
        case 'medium':
          return [
            chunks.slice(0, 3).join(' '),
            times(3, () => '···').join(' '),
            chunks.slice(-3).join(' '),
          ];
        case 'short':
          return [`${chunks.slice(0, 2).join(' ')}···${chunks.slice(-1)}`];
        default:
          throw new Error('Invalid length');
      }
    },
  },
  render(createElement) {
    return createElement(
      'span',
      {
        class: ['ae-address', this.length],
        directives: [{
          name: 'copy-to-clipboard',
          value: this.address,
        }, {
          name: 'remove-spaces-on-copy',
        }],
      },
      this.lines.reduce((p, line, idx) => [...p, idx ? createElement('br') : null, line], []),
    );
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.ae-address {
  position: relative;
  @extend %face-mono-base;
  font-weight: 500;
  letter-spacing: rem(1.9px);

  &.v-copied-to-clipboard:before {
    content: 'address copied';
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: $color-neutral-negative-3;
    background: rgba($color-neutral-positive-1, 0.9);
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }

  &.short.v-copied-to-clipboard:before {
    content: 'copied';
  }
}
</style>
