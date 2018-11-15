<template>
  <mobile-page
    class="accounts"
    fill="neutral"
  >
    <guide
      fill="primary"
    >
      <em>Activate the account</em>
      <br>that you want to use by
      <br>swiping
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
          @name-input="name => $store.commit('renameIdentity', { name, index })"
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
              <ae-button-new @click="copyValue(account.address)">
                <ae-icon name="copy" />
                Copy Address
              </ae-button-new>
            </li>
            <li>
              <ae-button-new @click="accountNameEditable = true">
                <ae-icon name="edit" />
                Rename
              </ae-button-new>
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

    <fixed-add-button
      quick-id
      @click="modalVisible = true"
    />

    <ae-modal-light
      v-if="modalVisible"
      title="Add New Account"
      @close="modalVisible = false"
    >
      <ae-label :for="_uid">Name Account</ae-label>
      <ae-input
        :id="_uid"
        v-model="newAccountName"
        placeholder="Placeholder" />
      <ae-button
        slot="buttons"
        size="small"
        type="exciting"
        plain
        uppercase
        @click="modalVisible = false"
      >
        cancel
      </ae-button>
      <ae-button
        slot="buttons"
        size="small"
        type="dramatic"
        plain
        uppercase
        @click="handleAddAddress"
      >
        add account
      </ae-button>
    </ae-modal-light>
  </mobile-page>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { AeButton, AeLabel, AeInput, AeModalLight } from '@aeternity/aepp-components';
import { AeButton as AeButtonNew, AeAddress, AeIcon, AeDropdown } from '@aeternity/aepp-components-3';
import { swiper as Swiper, swiperSlide as SwiperSlide } from 'vue-awesome-swiper';
import copy from 'clipboard-copy';
import MobilePage from '../components/MobilePage.vue';
import AeAccount from '../components/AeAccount.vue';
import ListItem from '../components/ListItem.vue';
import FixedAddButton from '../components/FixedAddButton.vue';
import Guide from '../components/Guide.vue';

export default {
  components: {
    AeAccount,
    AeAddress,
    AeButton,
    AeButtonNew,
    MobilePage,
    FixedAddButton,
    AeLabel,
    AeInput,
    AeModalLight,
    Swiper,
    SwiperSlide,
    Guide,
    ListItem,
    AeIcon,
    AeDropdown,
  },
  data: () => ({
    modalVisible: false,
    newAccountName: '',
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
    ...mapMutations(['selectIdentity', 'toggleIdManager', 'createIdentity']),
    handleAddAddress() {
      this.createIdentity(this.newAccountName);
      this.newAccountName = '';
      this.modalVisible = false;
    },
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
      margin-top: rem(61px);
    }
  }

  .guide {
    margin-left: rem(20px);
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

  .ae-overlay /deep/ .ae-modal-light main {
    text-align: start;
  }
}
</style>
