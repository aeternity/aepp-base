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
        v-for="i in identities"
        :key="i.address"
        class="current-slide"
      >
        <ae-account
          :address="i.address"
          :balance="i.balance"
          fill="primary"
        />
      </swiper-slide>
      <div
        slot="pagination"
        class="swiper-pagination"
      />
    </swiper>

    <ae-list>
      <ae-list-item>
        <div class="content">
          <div class="title">Three words identifier</div>
          <div class="subtitle">alive fussy bluetonguelizard</div>
        </div>
      </ae-list-item>
      <ae-list-item>
        <div class="content">
          <div class="title">Account Key</div>
          <div class="subtitle">
            <ae-address :value="activeIdentity.address" />
          </div>
        </div>
      </ae-list-item>
    </ae-list>

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
import {
  AeButton, AeLabel, AeInput, AeModalLight,
  AeAddress, AeList, AeListItem,
} from '@aeternity/aepp-components-3';
import { swiper as Swiper, swiperSlide as SwiperSlide } from 'vue-awesome-swiper';
import MobilePage from '../components/MobilePage.vue';
import AeAccount from '../components/AeAccount.vue';
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
    AeList,
    AeListItem,
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
        width: 311px;
        padding-bottom: 50px;
      }
    }

    .swiper-pagination {
      &-bullet {
        width: 12px;
        height: 12px;
        background: $color-neutral-negative-3;

        &-active {
          background: $color-primary;
        }
      }
    }
  }

  .ae-list {
    margin: auto;
    width: 279px;

    .ae-list-item {
      padding: 0;
      border-top-color: $color-neutral-positive-1;

      .content {
        margin: 20px 0;

        .title {
          margin-bottom: 10px;
          @extend %face-sans-xs;
          font-weight: 500;
          color: $color-neutral-negative-1;
        }

        .subtitle {
          @extend %face-mono-s;
          color: $color-neutral-negative-3;

          .ae-address {
            grid-template-columns: repeat(6, 1fr);
            grid-column-gap: 19px;
            font-weight: normal;
          }
        }
      }
    }
  }

  .ae-overlay /deep/ .ae-modal-light main {
    text-align: start;
  }
}
</style>
