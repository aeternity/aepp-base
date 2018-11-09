<template>
  <mobile-page
    :redirect-to-on-close="{ name: 'new-account-create' }"
    class="new-account-confirm"
    title="New Account"
    back-button
  >
    <guide
      fill="primary"
      icon="⅔"
    >
      <em>Confirm<img :src="fingersCrossedEmoji">your phrase</em>
      <br>Tap the words below
      <br>to compose your phrase,
      <br><mark>note</mark> correct order!
    </guide>

    <div class="words">
      <ae-badge
        v-for="(word, index) in seedPermutation"
        :disabled="selectedWordIds.includes(index)"
        :key="index"
        @click.native="wordClick(index)"
      >
        {{ word }}
      </ae-badge>
    </div>

    <div
      :class="{ 'error': error }"
      class="frame"
    >
      <div class="message" />
      <ae-badge
        v-for="index in selectedWordIds"
        :key="index"
        @click.native="wordClick(index)"
      >
        {{ seedPermutation[index] }}
        <ae-icon
          name="close"
          size="12px"
        />
      </ae-badge>
    </div>

    <ae-button
      slot="footer"
      :disabled="selectedWordIds.length !== seedPermutation.length"
      size="medium"
      fill="secondary"
      @click="confirmPhrase"
    >
      Confirm
    </ae-button>
  </mobile-page>
</template>

<script>
import { shuffle } from 'lodash-es';
import { AeBadge, AeIcon } from '@aeternity/aepp-components-3';
import fingersCrossedEmojiPath from 'emoji-datasource-apple/img/apple/64/1f91e.png';
import MobilePage from '../components/MobilePage.vue';
import Guide from '../components/Guide.vue';
import AeButton from '../components/AeButton.vue';

export default {
  components: {
    MobilePage,
    AeButton,
    Guide,
    AeBadge,
    AeIcon,
  },
  props: {
    seed: { type: String, required: true },
  },
  data() {
    return {
      seedPermutation: shuffle(this.seed.split(' ')),
      selectedWordIds: [],
      fingersCrossedEmoji: fingersCrossedEmojiPath,
      error: false,
    };
  },
  computed: {
    selectedSeed() {
      return this.selectedWordIds.map(idx => this.seedPermutation[idx]).join(' ');
    },
  },
  methods: {
    wordClick(id) {
      this.error = false;
      const ids = this.selectedWordIds;
      if (ids.includes(id)) {
        ids.splice(ids.indexOf(id), 1);
      } else {
        ids.push(id);
      }
    },
    confirmPhrase() {
      this.error = !(this.selectedSeed === this.seed);
      if (!this.error) {
        this.$router.push({ name: 'set-password', params: { seed: this.seed } });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components/dist/variables.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors';

.new-account-confirm {
  .ae-badge {
    margin: rem(4px) rem(4px) 0 0;

    .ae-icon {
      margin-left: rem(8px);
    }
  }

  .frame {
    margin-top: rem(32px);
    @extend %face-sans-xs;
    color: $color-neutral-negative-1;

    .message {
      margin-bottom: rem(14px);

      &:before {
        content: "Your phrase";
      }
    }

    &.error {
      margin-left: rem(-15px);
      padding-left: rem(15px);
      border-left: 2px solid $color-primary;

      .message {
        margin-bottom: rem(7px);
        color: $color-primary;

        &:before {
          content: "Oops! That doesn't match, try again";
        }
      }
    }
  }
}
</style>
<style lang="scss" src="../components/MobilePageContent.scss" scoped />
<style lang="scss" src="./FixedHeader.scss" scoped />
