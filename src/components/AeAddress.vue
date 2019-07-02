<script>
import { times, chunk } from 'lodash-es';
import copyOnClick from '../directives/copyOnClick';
import removeSpacesOnCopy from '../directives/removeSpacesOnCopy';

export default {
  directives: {
    copyOnClick,
    removeSpacesOnCopy,
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
    disableCopyOnClick: Boolean,
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
        directives: [
          ...this.disableCopyOnClick ? [] : [{
            name: 'copy-on-click',
            value: this.address,
          }],
          { name: 'remove-spaces-on-copy' },
        ],
      },
      this.lines.reduce((p, line, idx) => [...p, idx ? createElement('br') : null, line], []),
    );
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/placeholders/typography.scss';
@import './address-copied.scss';

.ae-address {
  @extend %face-mono-base;
  font-weight: 500;
  letter-spacing: rem(1.9px);

  &.v-copied {
    @extend %address-copied;
  }

  &.short.v-copied:before {
    content: 'copied';
  }
}
</style>
