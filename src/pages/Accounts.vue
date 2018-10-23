<template>
  <mobile-page
    class="accounts"
  >
    <guide
      fill="primary"
      icon="↪"
    >
      <em>Activate the account</em>
      <br>that you want to use
      <br>by swiping
    </guide>

    <swiper
      :options="swiperOptions"
      class="swiper-container"
    >
      <swiper-slide
        v-for="(i, index) in identities"
        :key="i.address"
        class="current-slide"
      >
        <ae-account
          :ref="index"
          :index="index"
          :address="i.address"
          :balance="i.balance"
          fill="primary"
        >
          <ae-dropdown slot="icon">
            <ae-icon
              slot="button"
              fill="white"
              name="more"
              size="20px"
            />
            <li>
              <ae-button @click="$clipboard($refs[index][0].accountName)">
                <ae-icon
                  name="copy"
                />
                Copy Address
              </ae-button>
            </li>
            <li>
              <ae-button @click="$refs[index][0].switchEdit(true)">
                <ae-icon name="edit" />
                Rename
              </ae-button>
            </li>
          </ae-dropdown>
        </ae-account>
      </swiper-slide>
      <div
        slot="pagination"
        class="swiper-pagination"
      />
    </swiper>

    <list-item>
      <div class="content">
        <div class="title">Three words identifier</div>
        <div class="subtitle">alive fussy bluetonguelizard</div>
      </div>
    </list-item>
    <list-item>
      <div class="content">
        <div class="title">Account Key</div>
        <div class="subtitle">
          <ae-address :value="activeIdentity.address" />
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
import { AeLabel, AeInput, AeModalLight } from '@aeternity/aepp-components';
import { AeButton, AeAddress, AeIcon, AeDropdown } from '@aeternity/aepp-components-3';
import { swiper as Swiper, swiperSlide as SwiperSlide } from 'vue-awesome-swiper';
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
            self.$refs[this.activeIndex][0].switchEdit(false);
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
  },
};
</script>

<style lang="css" src="swiper/dist/css/swiper.css" />
<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors';

.accounts {
  background: linear-gradient(to bottom, white, #f1f4f7);

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
    margin: rem(20px) auto;
    width: rem(279px);
    height: auto;
    padding: 0;
    border: none;
    border-top: rem(2px) solid $color-neutral-positive-1;

    .content {
      margin: rem(20px) 0;

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
