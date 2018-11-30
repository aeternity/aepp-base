<template>
  <mobile-page
    :redirect-to-on-close="{ name: 'accounts-new' }"
    class="accounts"
    fill="neutral"
    add-button
  >
    <guide
      fill="primary"
    >
      Your <em>æternity accounts</em>
      <div class="note">
        Create more in the upper right corner
        <br>and active an account by swiping
      </div>
    </guide>

    <swiper
      :options="swiperOptions"
      :key="identities.length > 1"
      class="swiper-container"
    >
      <swiper-slide
        v-for="(account, index) in identities"
        :key="account ? account.address : ''"
        class="current-slide"
      >
        <ae-account
          v-bind="account"
          :name-editable="index === selectedIdentityIdx && accountNameEditable"
          fill="primary"
          @name-input="name => renameIdentity({ name, index })"
          @name-blur="accountNameEditable = false"
        >
          <ae-dropdown slot="icon">
            <ae-icon
              slot="button"
              fill="white"
              name="more"
              size="20px"
            />
            <li>
              <ae-button @click="copyValue(account.address)">
                <ae-icon name="copy" />
                Copy Address
              </ae-button>
            </li>
            <li>
              <ae-button @click="accountNameEditable = true">
                <ae-icon name="edit" />
                Rename
              </ae-button>
            </li>
          </ae-dropdown>
        </ae-account>
      </swiper-slide>
      <div
        v-if="identities.length > 1"
        slot="pagination"
        class="swiper-pagination"
      />
    </swiper>

    <list-item slot="content-bottom">
      <div class="content">
        <div class="title">Account Key</div>
        <div class="subtitle">
          <ae-address :value="activeIdentity ? activeIdentity.address : ''" />
        </div>
      </div>
    </list-item>
  </mobile-page>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { AeButton, AeAddress, AeIcon, AeDropdown } from '@aeternity/aepp-components-3';
import { swiper as Swiper, swiperSlide as SwiperSlide } from 'vue-awesome-swiper';
import copy from 'clipboard-copy';
import MobilePage from '../components/MobilePage.vue';
import AeAccount from '../components/AeAccount.vue';
import ListItem from '../components/ListItem.vue';
import Guide from '../components/Guide.vue';

export default {
  components: {
    AeAccount,
    AeAddress,
    AeButton,
    MobilePage,
    Swiper,
    SwiperSlide,
    Guide,
    ListItem,
    AeIcon,
    AeDropdown,
  },
  data: () => ({
    accountNameEditable: false,
  }),
  computed: {
    ...mapGetters(['activeIdentity', 'identities']),
    ...mapState(['selectedIdentityIdx']),
    swiperOptions() {
      const self = this;

      return {
        spaceBetween: 10,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        initialSlide: this.selectedIdentityIdx,
        on: {
          slideChange() {
            self.accountNameEditable = false;
            self.selectIdentity(this.activeIndex);
          },
        },
      };
    },
  },
  mounted() {
    this.$store.dispatch('updateAllBalances');
  },
  methods: {
    ...mapMutations(['selectIdentity', 'renameIdentity']),
    copyValue(value) {
      copy(value);
    },
  },
};
</script>

<style lang="css" src="swiper/dist/css/swiper.css" />
<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors';

.accounts {
  /deep/ .panel .bottom {
    margin-top: rem(-81px);

    .content {
      margin-top: rem(30px);
    }
  }

  .guide {
    margin-left: rem(20px);

    .note {
      margin: rem(8px) 0;
      @extend %face-sans-s;
      font-weight: 500;
    }
  }

  .swiper-container /deep/ {
    z-index: 0;

    .swiper-wrapper {
      .current-slide {
        width: rem(311px);
        padding-bottom: rem(50px);

        .ae-dropdown {
          &-button {
            width: rem(20px);
            height: rem(20px);
          }
        }
      }
    }

    .swiper-pagination {
      margin-bottom: rem(16px);

      &-bullet {
        width: rem(12px);
        height: rem(12px);
        background: $color-neutral-negative-3;

        &-active {
          background: $color-primary;
        }
      }
    }
  }

  .list-item {
    display: block;
    margin: 0 auto;
    width: rem(279px);
    height: auto;
    padding: 0;
    border: none;

    .content {
      margin: 0;

      .title {
        margin-bottom: rem(10px);
        @extend %face-sans-xs;
        font-weight: 500;
        color: $color-neutral-negative-1;
      }

      .subtitle {
        @extend %face-mono-s;
        color: $color-neutral-negative-3;

        .ae-address {
          position: inherit;
          grid-template-columns: repeat(6, 1fr);
          grid-column-gap: rem(19px);
          font-weight: normal;
        }
      }
    }
  }
}
</style>
