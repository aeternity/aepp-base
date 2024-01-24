<template>
  <header class="header">
    <RouterLink
      :to="{ name: 'apps' }"
      class="logo"
    >
      <img src="../../assets/icons/base.svg"> {{ $t('header.title') }}
    </RouterLink>

    <div class="links">
      <RouterLink
        v-for="link in links"
        :key="link.routeName"
        :to="{ name: link.routeName }"
      >
        <Component
          :is="link.icon"
          :class="link.iconClass"
        />
        {{ link.name }}
      </RouterLink>
    </div>

    <ButtonPlain
      :class="{ empty: !account }"
      class="active-account"
      @click="toggleSidebar"
    >
      <div class="details">
        {{ account ? name : $t('header.connect-account') }}
        <div class="balance">
          {{ account ? convertedBalance : $t('header.connect-account-with') }}
        </div>
      </div>
      <AeIdenticon :address="account ? account.address : ''" />
    </ButtonPlain>
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { pluck, switchMap } from 'rxjs/operators';
import {
  Grid, Receive, Settings, Contacts,
} from '../icons';
import ButtonPlain from '../ButtonPlain.vue';
import AeIdenticon from '../AeIdenticon.vue';
import prefixedAmount from '../../filters/prefixedAmount';

export default {
  components: { AeIdenticon, ButtonPlain },
  subscriptions() {
    return {
      account: this.$store.state.observables.activeAccount,
      convertedBalance: this
        .$watchAsObservable(() => this.account, { immediate: true })
        .pipe(
          pluck('newValue'),
          switchMap((shouldSubscribe) => (shouldSubscribe
            ? this.$store.state.observables.convertAmount(() => this.account.balance)
            : Promise.resolve(''))),
        ),
    };
  },
  computed: {
    ...mapState('accounts', {
      name(state, { getName }) { return this.account && getName(this.account); },
    }),
    links() {
      return [{
        name: this.$t('app.title'),
        routeName: 'apps',
        icon: Grid,
      }, {
        name: this.$t('transfer.send.title'),
        routeName: 'send',
        icon: Receive,
        iconClass: 'send',
      }, {
        name: this.$t('transfer.receive.title'),
        routeName: 'receive',
        icon: Receive,
      }, {
        name: this.$t('name.title'),
        routeName: 'name-list',
        icon: Contacts,
      }, {
        name: this.$t('settings.title'),
        routeName: 'settings',
        icon: Settings,
      }];
    },
  },
  methods: {
    prefixedAmount,
    ...mapMutations(['toggleSidebar']),
  },
};
</script>

<style lang="scss" scoped>
@use '../../styles/variables';
@use '../../styles/functions';
@use '../../styles/typography';

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  margin-bottom: 50px;
  border-bottom: 1px solid variables.$color-neutral-positive-1;

  .logo, .active-account {
    width: 220px;
  }

  .logo, .links {
    white-space: nowrap;
  }

  .logo {
    margin-left: functions.rem(30px);
    text-decoration: none;
    color: variables.$color-neutral-negative-3;
    @extend %face-sans-base;
    font-weight: 500;

    img {
      width: functions.rem(32px);
      height: functions.rem(32px);
      margin-right: functions.rem(12px);
      padding: functions.rem(5px);
      border-radius: functions.rem(5px);
      box-sizing: border-box;
      background: variables.$color-primary;
      vertical-align: middle;
    }
  }

  .links {
    display: flex;

    a {
      display: block;
      margin: 0 functions.rem(15px);
      padding: 0 functions.rem(5px);
      @extend %face-uppercase-xs;
      color: variables.$color-neutral-negative-2;
      text-decoration: none;
      font-weight: bold;
      height: functions.rem(80px);
      line-height: functions.rem(80px);

      .icon.send {
        transform: rotate(180deg);
      }

      &.router-link-exact-active {
        border-bottom: functions.rem(2px) solid variables.$color-primary;
      }
    }
  }

  .active-account {
    margin-right: functions.rem(30px);
    display: flex;
    justify-content: flex-end;
    align-items: center;

    &.empty {
      .details .balance {
        font-size: functions.rem(10px);
      }

      .ae-identicon {
        box-shadow: 0 0 0 2px #ccc;
        opacity: .5;
        filter: grayscale(100%);
      }
    }

    .details {
      margin-right: functions.rem(20px);
      @extend %face-sans-xs;
      font-weight: 500;
      color: variables.$color-neutral-negative-3;
      text-align: right;

      .balance {
        color: variables.$color-neutral;
      }
    }

    .ae-identicon {
      width: functions.rem(26px);
      height: functions.rem(26px);
      border: functions.rem(2px) solid transparent;
      box-shadow: 0 0 0 2px variables.$color-primary;
    }
  }
}
</style>
