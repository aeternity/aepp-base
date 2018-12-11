<template>
  <mobile-page
    :redirect-to-on-close="{ name: 'transfer' }"
    class="send"
    fill="primary"
    close-button
  >
    <guide
      fill="neutral"
      icon="⅓"
    >
      <em>New Transfer</em>
      <br>from
      <ae-identicon
        :address="activeIdentity.address"
        size="s"
      /><em>{{ activeIdentity.name }}</em>
    </guide>

    <ae-address-input
      v-validate="'required|min:51|max:53'"
      :id="`${_uid}-accountTo`"
      :error="!!errors.first('accountTo')"
      v-model="accountTo"
      name="accountTo"
      label="Recipent"
      data-vv-delay="1"
      placeholder="ak_"
    >
      <ae-toolbar slot="footer">
        <ae-identicon
          v-if="accountTo"
          :address="accountTo"
          size="s"
        />
      </ae-toolbar>
    </ae-address-input>

    <template slot="content-bottom">
      <ae-button
        :disabled="errors.any()"
        size="medium"
        fill="secondary"
        uppercase
        @click="$router.push({ name: 'send-to', params: { to: accountTo } })"
      >
        Next
      </ae-button>

      <div
        v-if="identities.length > 1"
        class="own-account"
      >
        Or transfer to your own account
      </div>
      <list-item
        v-for="account in identities"
        v-if="account != activeIdentity"
        :to="{
          name: 'send-to',
          params: { to: account ? account.address : '' }
        }"
        :key="account.address"
      >
        <ae-identicon :address="account.address"/>
        <div class="content">
          <div class="title">{{ account.name }}</div>
          <div class="subtitle">{{ +account.balance }}</div>
        </div>
        <ae-icon
          slot="right"
          name="left-more"
        />
      </list-item>
    </template>
  </mobile-page>
</template>

<script>
import { mapGetters } from 'vuex';
import { AeIdenticon, AeToolbar, AeIcon } from '@aeternity/aepp-components-3';
import MobilePage from '../components/MobilePage.vue';
import Guide from '../components/Guide.vue';
import AeAddressInput from '../components/AeAddressInput.vue';
import AeButton from '../components/AeButton.vue';
import ListItem from '../components/ListItem.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AeIdenticon,
    AeAddressInput,
    AeToolbar,
    AeButton,
    ListItem,
    AeIcon,
  },
  data: () => ({
    accountTo: '',
  }),
  computed: {
    ...mapGetters(['activeIdentity', 'identities']),
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.send {
  /deep/ {
    .panel .bottom {
      margin-top: rem(-32px);

      .content {
        .ae-input {
          margin: 0;
        }

        .ae-button {
           margin: rem(60px) auto rem(30px) auto;
        }

        .own-account {
          margin: 0 0 rem(20px) rem(16px);
          font-weight: 500;
          color: $color-neutral-negative-1;
        }

        .list-item {
          margin: 0 rem(15px);
          padding: rem(4px);
          border-top: solid $color-neutral-positive-1;
          border-bottom: none;
          border-width: 2px;

          .ae-identicon {
            margin: 0 rem(9px) rem(4px) 0;
          }

          .content {
            .title {
              @extend %face-sans-s;
              font-weight: 500;
              color: $color-neutral-negative-3;
            }

            .subtitle {
              @extend %face-sans-xs;
              color: $color-neutral-negative-1;

              &:after {
                @extend %face-mono-xs;
                margin-left: rem(5px);
                content: 'AE';
              }
            }
          }

          .ae-icon {
            font-size: rem(20px);
          }
        }
      }
    }
  }

  .guide {
    margin: 0 0 rem(30px) rem(30px);

    .ae-identicon {
      margin: 0 rem(2px) rem(-4px) rem(2px);
    }
  }
}
</style>
<style lang="scss" src="../components/MobilePageContent.scss" scoped />
